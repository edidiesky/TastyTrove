import React from "react";
import Meta from "@/components/common/Meta";
import Navbar from "@/components/common/Navbar";

import HomeIndex from "../components/team";
const Trips = () => {
  return (
    <div>
      <Meta title={" TastyTrove Team - Restaurant"} />
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default Trips;
