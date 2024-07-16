import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const Word = ({ children }) => {
  const words = children?.split("");
  const text_1_ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: text_1_ref,
    offset: ["start .7", "start .25"],
  });
  return (
    <span ref={text_1_ref} className="w-full flex flex-wrap items-center">
      {words.map((word, index) => {
        const start = index / words?.length;
        const end = start + 1 / words?.length;
        const opacityonScroll = useTransform(
          scrollYProgress,
          [start, end],
          [0, 1]
        );
        return (
          <span key={index} className="relative">
            <span className="absolute w-full opacity-[.1]">{word}</span>
            <motion.span
              style={{ opacity: opacityonScroll, transition: "all .2s" }}
              className="w-full"
            >
              {word === " " ? "\u00A0" : word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

export default Word;
