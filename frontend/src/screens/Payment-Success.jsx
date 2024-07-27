import React from "react";
import PaymentIndex from "../components/payment-success";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
const PaymentSuccess = () => {
  return (
    <div>
      <Meta title={"Successful Payment - TastyTrove Restaurant"} />
      <Navbar/>
      <PaymentIndex />

    </div>
  );
};

export default PaymentSuccess;
