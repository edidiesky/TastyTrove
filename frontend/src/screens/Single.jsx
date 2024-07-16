import React from "react";
import HomeIndex from "../components/single";
import Meta from "@/components/common/Meta";
import { useSelector } from "react-redux";
import Banner from "@/components/common/Banner";
const Single = () => {
  const { room } = useSelector((store) => store.room);
  return (
    <div>
      <Meta title={`Home Detail for ${room?.title ? room?.title : ""} `} />
      <Banner type={"type"} subtext={"RESTAURANT TAKEOUT"} text={"MAIN COURSE"} />
      <HomeIndex />
    </div>
  );
};

export default Single;
