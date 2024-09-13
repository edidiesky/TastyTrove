import React from "react";
import PaymentIndex from "../components/payment-success";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
import SmoothScroll from "@/constants/utils/SmoothScroll";
const PaymentSuccess = () => {
  return (
    <SmoothScroll>
      <Meta title={"Successful Payment - TastyTrove Restaurant"} />
      <Navbar/>
      <PaymentIndex />

    </SmoothScroll>
  );
};

export default PaymentSuccess;
