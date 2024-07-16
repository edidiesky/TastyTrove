import React from "react";
import AnimateText from "./AnimateText";
// animattions to staggerText
const StaggeredText = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[1000px] flex flex-col gap-4">
        <h1 className="text-8xl font-booking_font4">
          <AnimateText children={"Instagram"} />
        </h1>
        <h1 className="text-8xl font-booking_font4">
          {" "}
          <AnimateText children={"Facebook"} />
        </h1>
        <h1 className="text-8xl font-booking_font4">
          {" "}
          <AnimateText children={"Twitter"} />
        </h1>{" "}
        <h1 className="text-8xl font-booking_font4">
          {" "}
          <AnimateText children={"Github"} />
        </h1>
      </div>{" "}
    </div>
  );
};

export default StaggeredText;
