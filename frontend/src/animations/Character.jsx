import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const Character = ({ children }) => {
  const words = children?.split("");
  const text_1_ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: text_1_ref,
    offset: ["start .7", "start .25"],
  });

  return (
    <span ref={text_1_ref}>
      {words.map((word, index) => {
        const start = index / words?.length;
        const end = start + 1 / words?.length;
        return (
          <span key={index} className="relative w-full">
            <Chars
              progress={scrollYProgress}
              range={[start, end]}
              children={word}
            />
          </span>
        );
      })}
    </span>
  );
};

const Chars = ({ children, range, progress }) => {
  const chars = children?.split("");
  return (
    <span>
      {chars.map((word, index) => {
        let amount = range[1] - range[0];
        let step = amount / chars.length;
        const newstart = range[0] + step * index;
        const newend = range[1] + step * (index + 1);
        const opacityonScroll = useTransform(
          progress,
          [newstart, newend],
          [0, 1]
        );
        return (
          <span key={index} className="relative w-full">
            <span className="absolute opacity-[.3]">{word}</span>
            <motion.span style={{ opacity: opacityonScroll }} className="">
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
export default Character;
