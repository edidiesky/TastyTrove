import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { slideRight, slideup } from "@/constants/utils/framer";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Image from "../common/Image";

export default function SingleTakout() {
  const singleRef = useRef(null);
  const containersingleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containersingleRef,
    offset: ["start 80%", "end start"],
  });
  const inView = useInView(singleRef, {
    margin: "0px 100px -120px 0px",
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const { menus } = useSelector((store) => store.menu);
  return (
    <div
      ref={containersingleRef}
      className="w-full overflow-hidden flex items-center justify-center min-h-[100vh] py-40 relative"
    >
      <motion.div style={{ scale }} className="w-full h-full absolute">
        <Image
          alt="lazy"
          src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu372x.jpg"
          className="w-full h-full z-20 top-0 absolute object-cover"
        />
      </motion.div>
      <div className="flex md:flex-row flex-col w-85 z-40 auto">
        <motion.div
          variants={slideRight}
          ref={singleRef}
          initial="initial"
          animate={inView ? "animate" : "exit"}
          className="flex-1 md:flex-[0.5] bg-[#000] flex-col flex gap-12 px-12 md:px-20 py-24"
        >
          <h1 className="family3 flex items-start gap-4 justify-between leading-[1.6] text-6xl md:text-7xl text-white">
            <span className="leading-[1.3]">{menus[0]?.title}</span>
            <span className="family1 pt-8 text-xl">${menus[0]?.price}</span>
          </h1>
          <h4 className="text-xl md:text-2xl  family2 text-light text-[var(--grey-1)]">
            {menus[0]?.description}
          </h4>
          <div className="w-full text-start">
            <Link
              to={`restaurant/takeout/${menus[0]?.id}?category=${menus[0]?.category}`}
              className=""
            >
              <button className="h-[65px] w-[200px] rounded-[40px] overflow-hidden text-lg uppercase">
                <Button bgColor={"rgb(255,255,255)"}  text={"View This Menu"} />
              </button>
            </Link>
          </div>
        </motion.div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
