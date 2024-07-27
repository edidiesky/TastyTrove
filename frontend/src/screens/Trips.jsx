import React from "react";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/Navbar";

import HomeIndex from "../components/reservations";
const Trips = () => {
  return (
    <div>
      <Meta title={"Reservations - TastyTrove"} />
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default Trips;
