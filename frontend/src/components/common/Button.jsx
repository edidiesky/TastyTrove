import React from "react";
import Magnetic from "@/animations/Magnetic";

const Button = ({ text, bgColor, color, type }) => {
  if (type === "dark") {
    return (
      <button
        style={{ transition: "all .5s" }}
        className={`w-[250px] border border-[rgba(0,0,0,.4)] 
              text-dark h-[65px] family1 uppercase hover:text-[#fff] text-[ #000] text-light fs-16`}
      >
        <Magnetic bgColor={bgColor}> {text}</Magnetic>
      </button>
    );
  }

  if (type === "white") {
    return (
      <button
        style={{ transition: "all .5s", background: `#fff` }}
        className={`w-[190px]
              text-dark h-[65px] family1 uppercase text-light fs-16`}
      >
        <Magnetic bgColor={bgColor}> {text}</Magnetic>
      </button>
    );
  }
  return (
    <button
      style={{ transition: "all .5s" }}
      className={`w-[250px] border border-[rgba(255,255,255,.8)] 
              text-dark h-[65px] family1 uppercase hover:text-[#000] text-[#fff] text-light fs-16`}
    >
      <Magnetic bgColor={bgColor}> {text}</Magnetic>
    </button>
  );
};

export default Button;
