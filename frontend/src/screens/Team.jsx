import React from "react";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
import SmoothScroll from "@/constants/utils/SmoothScroll";
import HomeIndex from "../components/team";
const Trips = () => {
  return (
    <SmoothScroll>
      <Meta title={" TastyTrove Team - Restaurant"} />
      <Navbar />
      <HomeIndex />
    </SmoothScroll>
  );
};

export default Trips;
