import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "./Card";
import { projects } from './data';

const ParallaxContainer = () => {
      const containerRef = useRef(null);
      const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
      });
    return (
      <div className="w-full flex flex-col">
        <div ref={containerRef} className="w-full">
          <div className="w-[90%] mx-auto max-w-custom_1">
            {projects.map((data, index) => {
              const targetScale = 1 - (projects.length - 1) * 0.05;
              return (
                <Card
                  progress={scrollYProgress}
                  targetScale={targetScale}
                  range={[index * 0.25, 1]}
                  data={data}
                  index={index}
                  key={`p_${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
}


export default ParallaxContainer;