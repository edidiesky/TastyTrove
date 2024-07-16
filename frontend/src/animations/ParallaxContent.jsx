import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxContent = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  return (
    <div
      ref={containerRef}
      className="w-full bg-[#eee] h-[200vh] flex flex-col"
    >
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="h-screen sticky top-0 bg-[#C02223] w-full flex items-center justify-center"
    >
      <div className="relative w-[1000px] mx-auto flex items-center justify-center">
        <h1 className="font-booking_font4 text-center text-5xl text-white">
          A Scroll Based Perspective <br /> Animations
        </h1>
        <img
          src="/images/hazel_1.jpeg"
          alt=""
          className="w-64 object-cover h-24 
        absolute -bottom-24"
        />
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
   const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
   const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="h-screen z-20 bg-[#000] w-full flex items-center justify-center"
    >
      <div className="relative w-[700px] mx-auto flex items-center justify-center">
        <h1 className="font-booking_font4 text-center text-5xl text-white">
          A second Scroll Based Perspective <br /> Animations
        </h1>
        <img
          src="/images/hazel_2.jpeg"
          alt=""
          className="w-64 object-cover h-24 
        absolute -bottom-32"
        />
      </div>
    </motion.div>
  );
};



export default ParallaxContent;
