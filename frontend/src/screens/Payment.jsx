import React from "react";
import PaymentIndex from "../components/payment";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
import SmoothScroll from "@/constants/utils/SmoothScroll";
import Footer from "@/components/common/Footer";
const Payment = () => {
  return (
    <SmoothScroll>
      <Meta title={"Payment for my booked Menu"} />
      <Navbar />
      <PaymentIndex />
      <Footer />
    </SmoothScroll>
  );
};

export default Payment;
