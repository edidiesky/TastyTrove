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



const data = [
  {
    id: 1,
    subText: "Check out Menu",
    title: "The best table in town",
    desc: "Sed aenean egestas ut aliquam turpis mauris, molestie. Vitae tellus tempor sem id tempus neque, tellus turpis turpis. Morbi tortor id gravida aliquet.",
  },
  {
    id: 2,
    subText: "View out Menu",
    title: "Perfect For Groups",
    desc: "Quam eu proin sit massa condimentum. Volutpat non pulvinar aliquet nunc. Orci elementum in aliquet a gravida vivamus aliquam turpis vitae.",
  },
  {
    id: 3,
    subText: "Check out Menu",
    title: "Fresh produce everyday",
    desc: "Hendrerit amet, volutpat leo non, commodo maecenas scelerisque tincidunt. Morbi vulputate morbi purus quisque sit sagittis orci elementum gravida.",
  },
];

 function About() {
  return (
    <div className="flex overflow-hidden w-full flex-col gap-4">
      <div className="w-full flex flex-col gap-16">
        <div className="w-85 auto wrapper flex gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-12">
            <h4 className="text-base max-w-[500px] md:text-xl family4">
              HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper eget
              tortor, donec amet,
            </h4>
            <h1 className="family3 text-6xl flex flex-col sm:text-7xl leading-[1.5]">
              <Word children={`Food is our common`} />
              Food is our common
              <br />
              ground, a universal
              <br /> experience.
            </h1>
            <h4 className="text-base max-w-[500px] md:text-xl family4">
              HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper eget
              tortor, donec amet,
            </h4>

            <div className="w-full py-2">
              <img
                alt=""
                width={0}
                sizes="100vw"
                height={0}
                loading="lazy"
                className="w-[150px]"
                src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/signature.jpg"
                // style={{ width: "200px" }}
              />
            </div>
          </div>
          <div className="flex-1 md:flex hidden aboutImageWrapper">
            {/* eslint-disable-next-line @next/next/no-img-element,
          @next/next/no-img-element */}
            <div className="w-full h-[40rem]">
              <img
                src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info22x.jpg"
                alt=""
              />{" "}
            </div>
          </div>
        </div>
        <div className="w-90 auto">
          <div className="md:w-[80%] auto aboutBottom md:grid-cols-3 grid gap-2">
            {data.map((x, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  ref={animateAbout}
                  className="w-full hide  lg:py-12"
                  key={index}
                >
                  <header key={x.id} className="flex flex-col gap-2 w-full">
                    <h3 className="family3 text-center pb-3 text-4xl md:text-4xl font-normal">
                      {x.title}
                    </h3>
                    <h4 className="family4 text-center text-base md:text-lg font-normal">
                      {x.desc}
                    </h4>
                    <div className="w-full mt-4 text-center">
                      <button className="h-[60px] w-[200px] text-base">
                        {x?.subText}
                      </button>
                    </div>
                  </header>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



 function Home() {

  return (
    <div>
      {/* <HomeIndex /> */}
    </div>
  );
}
