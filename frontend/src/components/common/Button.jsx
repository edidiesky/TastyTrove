import React from "react";
import Magnetic from "@/animations/Magnetic";

const Button = ({ text, bgColor, color, type, disabled }) => {
  if (type === "dark") {
    return (
      <button
        disabled={disabled}
        style={{ transition: "all .6s" }}
        className={`w-full border border-[rgba(0,0,0,.4)] 
              text-dark h-full family1 hover:text-[#fff] text-[ #000] text-light`}
      >
        <Magnetic disabled={disabled} bgColor={bgColor}>
          {" "}
          {text}
        </Magnetic>
      </button>
    );
  }

  if (type === "full_dark") {
    return (
      <button
        disabled={disabled}
        style={{ transition: "all .6s" }}
        className={`w-full border rounded-[40px] bg-[#000] h-full family1
           hover:text-[#000] text-[#fff] text-light`}
      >
        <Magnetic disabled={disabled} bgColor={bgColor}>
          {" "}
          {text}
        </Magnetic>
      </button>
    );
  }

  if (type === "white") {
    return (
      <button
        disabled={disabled}
        style={{ transition: "all .6s", background: `#fff` }}
        className={`w-full
              text-dark h-full rounded-[40px] family1 text-light`}
      >
        <Magnetic disabled={disabled} bgColor={bgColor}>
          {" "}
          {text}
        </Magnetic>
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      style={{ transition: "all .6s" }}
      className={`w-full rounded-[40px]
              text-dark h-full family1 bg-[var(--primary)] hover:text-[#000] text-[#fff] text-light`}
    >
      <Magnetic disabled={disabled} bgColor={bgColor}>
        {" "}
        {text}
      </Magnetic>
    </button>
  );
};

export default Button;
