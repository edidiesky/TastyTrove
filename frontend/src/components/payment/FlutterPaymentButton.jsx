import React, { useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CreatePayment } from "@/features/payment/paymentReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../home/loader";
import { handleClearPaymentAlert } from "@/features/payment/paymentSlice";
const FlutterPaymentButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleClearPaymentAlert());
  }, []);
  const { currentUser } = useSelector((store) => store.auth);
  const { reservation } = useSelector((store) => store.reservation);
  const { payment, createpaymentisSuccess, createpaymentisLoading } =
    useSelector((store) => store.payment);
  const [flutterpaymentsuccess, setFlutterPaymentSuccess] = useState(false);
  const config = {
    public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: reservation?.totalPrice,
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
    dispatch(
      CreatePayment({
        reservationid: reservation?.id,
        amount: reservation?.totalPrice,
        currency: "NGN",
      })
    );
  };
  useEffect(() => {
    if (flutterpaymentsuccess) {
      const timer = setTimeout(() => {
        navigate(
          `/payment-success/${payment?.id}?reservationid=${payment?.reservationid}`
        );
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [flutterpaymentsuccess, navigate]);
  // console.log(payment);
  return (
    <button
      disabled={createpaymentisSuccess}
      onClick={() => {
        handleCreateOrderPayment();
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
            alert("Payment Modal Closed");
          },
        });
      }}
      style={{ letterSpacing: "4px" }}
      className="btn p-6 rounded-[40px] cursor-pointer px-8 text-sm font-normal uppercase text-center text-white font-booking_font"
    >
      {createpaymentisLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader type="dots" />
          Creating Payment
        </span>
      ) : (
        " pay now"
      )}
    </button>
  );
};

export default FlutterPaymentButton;
