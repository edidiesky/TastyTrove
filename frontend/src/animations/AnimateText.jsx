import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// animattions to staggerText
const AnimateText = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover={"hover"}
      className="relative max-w-fit cursor-pointer block overflow-hidden whitespace-nowrap"
    >
      <div className="flex items-center relative">
        {children.split("").map((data, index) => {
          return (
            <motion.span
              key={index}
              variants={{
                initial: { y: "0px" },
                hover: { y: "-100%" },
              }}
              transition={{
                delay: index * 0.025,
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {data === " " ? "\u00A0" : data}
            </motion.span>
          );
        })}
      </div>
      <div className="flex w-full items-center absolute inset-0">
        {children.split("").map((data, index) => {
          return (
            <motion.span
              key={index}
              variants={{
                initial: { y: "100%" },
                hover: { y: "0" },
              }}
              transition={{
                delay: index * 0.025,
                duration: 0.25,
                ease: "easeInOut",
              }}
            >
              {data === " " ? "\u00A0" : data}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnimateText;
