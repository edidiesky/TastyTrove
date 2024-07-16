import React from "react";
import PaymentIndex from "../components/payment";
import Meta from "@/components/common/Meta";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/Footer";
const Payment = () => {
  return (
    <div>
      <Meta title={"Payment for my booked Room"} />
      <Navbar />
      <PaymentIndex />
      <Footer />
    </div>
  );
};

export default Payment;
