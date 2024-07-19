import React from "react";
import Meta from "@/components/common/Meta";
import Banner from "@/components/common/Banner";
import HomeIndex from "../components/saved";
import Navbar from "@/components/common/navbar";
const Saved = () => {
  return (
    <div>
      <Meta title={"Cart - TastyTrove Restaurant"} />
      <Navbar />
      <Banner type={"type"} subtext={"RESTAURANT TAKEOUT"} text={"CART"} />
      <HomeIndex />
      
    </div>
  );
};

export default Saved;
