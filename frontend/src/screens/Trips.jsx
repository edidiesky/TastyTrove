import React from "react";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
import SmoothScroll from "@/constants/utils/SmoothScroll";
import HomeIndex from "../components/reservations";
const Trips = () => {
  return (
    <SmoothScroll>
      <Meta title={"Reservations - TastyTrove"} />
      <Navbar />
      <HomeIndex />
    </SmoothScroll>
  );
};

export default Trips;
