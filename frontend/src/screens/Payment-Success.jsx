import React from "react";
import PaymentIndex from "../components/payment-success";
import Meta from "@/components/common/Meta";
const PaymentSuccess = () => {
  return (
    <div>
      <Meta title={"Successful Payment - TastyTrove Restaurant"} />
      <PaymentIndex />
    </div>
  );
};

export default PaymentSuccess;
