import React from "react";
import HomeIndex from "../components/single";
import Meta from "@/components/common/Meta";
import { useSelector } from "react-redux";
const Single = () => {
  const { room } = useSelector((store) => store.room);
  return (
    <div>
      <Meta title={`Home Detail for ${room?.title ? room?.title : ""} `} />
      <HomeIndex />
    </div>
  );
};

export default Single;
