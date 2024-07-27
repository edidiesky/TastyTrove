import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "./data";
const SideMenu = ({ children }) => {
  // const targetRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  // });
  // const translateByX = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <div className="w-full py-40 min-h-[300vh] relative">
  
    </div>
  );
};

const HorizontalScrollCard = ({ data }) => {
  return (
    <div className="w-[500px] h-[500px] relative flex flex-col gap-4">
   </div>
  );
};
export default SideMenu;
