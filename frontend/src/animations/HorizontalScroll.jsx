import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "./data";
const HorizontalScroll = ({ children }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const translateByX = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <div className="w-full bg-[#000] py-40 min-h-[300vh] relative">
      <div className="sticky flex items-center justify-center overflow-hidden bg-[#131313d1] top-0 h-screen">
        <motion.div
          style={{ x: translateByX }}
          className="flex gap-4 items-center"
        >
          {projects.map((data, index) => {
            return <HorizontalScrollCard key={index} data={data} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

const HorizontalScrollCard = ({ data }) => {
  return (
    <div className="w-[500px] h-[500px] relative flex flex-col gap-4">
      <img src={data?.src} alt="" className="w-[500px] h-[500px]" />
      <h2 className="text-3xl font-booking_font4 text-white">{data?.title}</h2>
    </div>
  );
};
export default HorizontalScroll;
