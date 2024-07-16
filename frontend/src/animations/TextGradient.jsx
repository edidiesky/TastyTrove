import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Word from "./Word";
// animattions to staggerText
const TextGradient = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-[#000] h-[100vh] flex items-center justify-center"></div>
      <div className="w-full bg-[#000] h-[100vh] flex items-center justify-center"></div>
      <div className="w-full bg-[#000] h-[50vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto">
          <h2 className="text-white w-full leading-[1.5] text-4xl font-booking_font4">
            <Word
              children={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ipsum aut perspiciatis cupiditate ab explicaboconsequatur velit, nesciunt iste itaque sapiente commodi similique consectetur pariatur error vitae quidem. Blanditiis, iusto?`}
            />
          </h2>
        </div>
      </div>
      <div className="w-full bg-[#000] h-[50vh] flex items-center justify-center"></div>
      <div className="w-full bg-[#000] h-[100vh] flex items-center justify-center">

        <div className="w-[80%] mx-auto">
          <h2
            className="text-white w-full leading-[1.5] text-4xl font-booking_font4"
          >
            <Word
              children={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ipsum aut perspiciatis cupiditate ab explicabo consequatur velit, nesciunt iste itaque sapiente commodi similique consectetur pariatur error vitae quidem. Blanditiis, iusto?`}
            />
          </h2>
        </div>
      </div>
      <div className="w-full bg-[#000] h-[50vh] flex items-center justify-center"></div>
    </div>
  );
};

export default TextGradient;
