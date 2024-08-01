import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FlutterWavePayment = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const paymentData = {
    amount: 200,
    userInfo: {
      email: "test@gmail.com",
      phonenumber: "07898894",
      name: "flutterwave testUser",
    },
    currency: "USD",
    cartItems: [
      {
        title: "test Cart",
        price: 40,
        quantity: 5,
      },
    ],
  };
  const [flutterpaymentsuccess, setFlutterPaymentSuccess] = useState(false);
  const config = {
    public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: paymentData?.amount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: paymentData?.userInfo?.email,
      phonenumber: paymentData?.userInfo?.phone,
      name: paymentData?.userInfo?.name,
    },
    customizations: {
      title: "Payment for TastyTrove",
      description: "Payment for plaing an order",
      logo: "https://www.hopper.com/assets/treasure-D-5S8iOp.svg",
    },
  };

  // initiallize flutterWavePayment
  const handleFlutterwavePayment = useFlutterwave(config);
  // setup our create payment handler for interacting with our api
  const handleCreateOrderPayment = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/payment`,
        paymentData
      );
      setPayment(data.payment);
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    if (flutterpaymentsuccess) {
      const timer = setTimeout(() => {
        navigate(`/payment-success/${payment?.id}`);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [flutterpaymentsuccess, navigate]);
  // console.log(payment);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
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
        className="family1 py-4 rounded-[40px] hover:opacity-[.7]
       bg-[#000] text-white text-center px-8 cursor-pointer 
       text-dark text-base font-semibold uppercase"
      >
        pay now
      </button>
    </div>
  );
};

export default FlutterWavePayment;
