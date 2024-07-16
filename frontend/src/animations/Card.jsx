import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Card = ({ data, index, progress, targetScale, range }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="w-full h-[100vh] sticky top-0 flex items-center justify-center">
      <motion.div
        ref={containerRef}
        style={{
          scale: cardScale,
          background: `${data?.color}`,
          top: `calc(-5vh + ${index * 25}px) `,
        }}
        className="flex flex-col gap-12 p-[50px] rounded-[25px] relative w-[1000px]"
      >
        <h2 className="text-dark text-center w-full font-booking_font4 text-4xl">
          {data?.title}
        </h2>
        <div className="w-full grid grid-cols-2 gap-8 items-center">
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              obcaecati odio laboriosam, maxime earum consequuntur iste nisi
              quis commodi? Neque beatae laudantium asperiores in eius totam
              tempore molestias corporis aperiam.
            </p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              obcaecati odio laboriosam, maxime earum consequuntur iste nisi
              quis commodi? Neque beatae laudantium asperiores in eius totam
              tempore molestias corporis aperiam.
            </p>
          </div>
          <div className="w-full relative overflow-hidden rounded-xl">
            <motion.div
              style={{ scale }}
              className="w-full h-[70%] relative overflow-hidden"
            >
              <img
                src={data?.src}
                alt=""
                className="w-full h-full rounded-xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
