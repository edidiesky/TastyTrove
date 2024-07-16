import React from "react";
import Meta from "@/components/common/Meta";
import Banner from "@/components/common/Banner";
import HomeIndex from "../components/saved";
const Saved = () => {
  return (
    <div>
      <Meta title={"Cart - TastyTrove Restaurant"} />
      <Banner
        type={"type"}
        subtext={"RESTAURANT TAKEOUT"}
        text={"CART"}
      />
      <HomeIndex />
    </div>
  );
};

export default Saved;
