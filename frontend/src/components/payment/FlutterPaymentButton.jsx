import React, { useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CreatePayment } from "@/features/payment/paymentReducer";
import { useNavigate } from "react-router-dom";
// import Loader from "..//loader";
import { handleClearPaymentAlert } from "@/features/payment/paymentSlice";
import Loader from "../loader";
import { UpdatePaymentToFailed } from "../../features/payment/paymentReducer";
import { onLoginModal } from "@/features/modals/modalSlice";
const FlutterPaymentButton = ({ totalPrice }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleClearPaymentAlert());
  }, []);
  const { currentUser, shippingInformation } = useSelector(
    (store) => store.auth
  );
  const { cart } = useSelector((store) => store.cart);

  const {
    payment,
    updatepaymentisLoading,
    createpaymentisSuccess,
    createpaymentisLoading,
  } = useSelector((store) => store.payment);
  const [flutterpaymentsuccess, setFlutterPaymentSuccess] = useState(false);
  const [flutterpaymentfailed, setFlutterPaymentFailed] = useState(false);
  const config = {
    public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: currentUser?.email,
      phonenumber: currentUser?.phone,
      name: currentUser?.name,
    },
    customizations: {
      title: "Payment for Booking",
      description: "Payment for booking a room",
      logo: "https://www.hopper.com/assets/treasure-D-5S8iOp.svg",
    },
  };

  const handleFlutterwavePayment = useFlutterwave(config);
  const handleCreateOrderPayment = () => {
    if (currentUser === null) {
      dispatch(onLoginModal());
    } else {
      dispatch(
        CreatePayment({
          cartItems: cart,
          amount: totalPrice,
          currency: "NGN",
          ShippingInformation: shippingInformation,
        })
      );
    }
  };
  useEffect(() => {
    if (flutterpaymentsuccess) {
      const timer = setTimeout(() => {
        navigate(`/payment-success/${payment}`);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [flutterpaymentsuccess, navigate]);
  useEffect(() => {
    if (flutterpaymentfailed) {
      dispatch(UpdatePaymentToFailed(payment));
    }
  }, [flutterpaymentfailed, payment]);
  // console.log(payment);
  return (
    <>
      {updatepaymentisLoading && <Loader />}
      <button
        disabled={createpaymentisSuccess || shippingInformation === null}
        onClick={() => {
          handleCreateOrderPayment();
          {
            currentUser !== null &&
              handleFlutterwavePayment({
                callback: (response) => {
                  // handleCreateOrderPayment();
                  // console.log(response);
                  if (response.status === "successful") {
                    // Handle successful payment here
                    setFlutterPaymentSuccess(true);
                    toast.success("Payment Successful!! Redirecting Soon...");
                  } else {
                    toast.error("Payment Failed");
                  }
                  closePaymentModal(); // Close the modal programmatically
                },
                onClose: () => {
                  // Handle when the payment modal is closed
                  // alert("Payment Modal Closed");
                  setFlutterPaymentFailed(true);
                },
              });
          }
        }}
        className="family1 py-4 rounded-[40px] hover:opacity-[.7] bg-[#fff] text-center w-full cursor-pointer 
        text-dark text-base font-normal uppercase"
      >
        {createpaymentisLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader type="dots" color={"#000"} />
            Creating Payment
          </span>
        ) : (
          " pay now"
        )}
      </button>
    </>
  );
};

export default FlutterPaymentButton;
