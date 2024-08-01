const DashboardSidebar = () => {
  return (
    <div className={`w-full flex column sticky top-0 h-screen gap-2`}>
      <div className="w-full h-full py-4 justify-between flex items-center flex-col gap-4">
        {/* top content */}
        <div className=" w-[90%] mx-auto relative flex gap-4 items-center flex-col justify-between">
          <Link
            to={"/"}
            className="w-full flex items-center gap-1 justify-start"
          >
            <img
              loading="lazy"
              src="https://www.hopper.com/assets/treasure-D-5S8iOp.svg"
              className="w-14 h-14 rounded-full object-cover"
            />
          </Link>
        </div>
        {/* center content */}
        {/* bottom content */}
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <div className="w-full">
      {/* sidebar section */}
      {/* main outlet */}
      {Navlinks.map((items, index) => {
        return <NavItems key={index} />;
      })}
    </div>
  );
};
import { Link, NavLink } from "react-router-dom";
const NavItems = ({ Items }) => {
  return (
    <div className="w-full">
      <div className="w-[100%]  family5 font-normal text-sm mx-auto">
        <NavLink
          // activeClassName="active"
          end
          className={`group tab
                      relative
                      text-base w-[90%] mx-auto`}
          to={`/dashboard${Items.path}`}
        >
          <div className="flex w-full  md:justify-center items-center">
            <span className="w-12 h-12 text-base rounded-xl flex items-center text-blue justify-center">
              {" "}
              {Items.icon}
            </span>
          </div>
          <div
            className="absolute text-sm group-hover:opacity-1
             opacity-0 top-[55%] group-hover:top-[25%] block px-4 py-2 bg-[#000]
            text-[#fff] rounded-[40px] left-[140%]"
          >
            {Items?.title}
          </div>
          ;
        </NavLink>
      </div>
    </div>
  );
};
<div
  className="absolute text-sm group-hover:opacity-1
   opacity-0 top-[55%] group-hover:top-[25%] block px-4 py-2 bg-[#000]
    text-[#fff] rounded-[40px] left-[140%]"
>
  {Items?.title}
</div>;
const Navlinks = [
  {
    title: "Dashboard",
    path: "",
    icon: <LayoutDashboard fontSize={"20px"} />,
  },
  {
    icon: <BiFoodMenu fontSize={"20px"} />,
    title: "Menu",
    path: "/menu",
  },
  {
    icon: <FaMoneyBill fontSize={"20px"} />,
    title: "Transactions",
    path: "/orders",
  },
  {
    icon: <MdRateReview fontSize={"20px"} />,
    title: "Reviews",
    path: "/review",
  },
  {
    icon: <BiMessage fontSize={"20px"} />,
    title: "Messages",
    path: "/message",
  },
  {
    icon: <FaRegUser fontSize={"18px"} />,
    title: "Clients",
    path: "/customers",
  },
];
<Routes>
  <Route
    path="/restaurant/takeout/:food"
    element={
      <Suspense fallback={<></>}>
        <SingleWrapper />
      </Suspense>
    }
  />
  <Route
    path="/restaurant/cart"
    element={
      <Suspense fallback={<></>}>
        <Cart />
      </Suspense>
    }
  />
</Routes>;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const { id } = useParams();
  const [flutterpaymentsuccess, setFlutterPaymentSuccess] = useState(false);
  const [updateflutterpaymentloading, setUpdateFlutterPaymentLoading] =
    useState(false);
  const UpdatePaymentToSuccess = async () => {
    try {
      // set the success state and loading state to false and true respectively
      setFlutterPaymentSuccess(false);
      setUpdateFlutterPaymentLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/payment/history/success/${id}`,
        null
      );
      // set the loading state and success state to false and true respectively
      setUpdateFlutterPaymentLoading(false);
      setFlutterPaymentSuccess(true);
      return data;
    } catch (error) {
      setUpdateFlutterPaymentLoading(false);
      setFlutterPaymentSuccess(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    UpdatePaymentToSuccess();
  }, []);
  useEffect(() => {
    if (flutterpaymentsuccess) {
      const interval = setTimeout(() => {
        setFlutterPaymentSuccess(false);
      }, 100);
      return () => clearTimeout(interval);
    }
  }, [flutterpaymentsuccess]);
  if (updateflutterpaymentloading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">Payment Loading ....</h2>
      </div>
    );
  }
  return (
    <>
      {flutterpaymentsuccess && <Confettis />}
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-5xl text-center font-bold">
          Payment Succesfull
          <span className="text-lg pt-4 block text-[#777] font-normal">
            Thank you for the payment!!!!
          </span>
        </h2>
      </div>
    </>
  );
};

const Confettis = () => {
  const { width, height } = useWindowSize();
  // console.log(height);
  return <Confetti style={{ zIndex: "3000000" }} width={width} height={2000} />;
};

// https://app.flutterwave.com/dashboard/home
export default PaymentSuccess;
