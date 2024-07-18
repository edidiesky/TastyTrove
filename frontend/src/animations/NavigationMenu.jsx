import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimateText from "./AnimateText";
import { BiCart } from "react-icons/bi";
// animattions to staggerText
const NavigationMenu = () => {
  const [menu, setMenu] = useState(false);
  const opacityVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
  return (
    <>
      <div
        className="w-full h-[70px] bg-[#F3EEE8] flex 
    items-center justify-center"
      >
        <div
          className="w-full w-90 auto flex 
    items-center justify-between"
        >
          <h1 className="text-xl uppercase family1">Taroove</h1>
          <div className="flex items-center justify-center gap-4">
            <div
              className="w-[50px] h-[50px] items-center justify-center flex cursor-pointer after:cursor-pointer before:cursor-pointer  before:w-full relative
          before:h-[2px] after:absolute before:absolute before:bg-[#000] 
          before:top-4 after:w-full 
          after:h-[2px] after:bg-[#000]"
            ></div>
            <h1
              onClick={() => setMenu(!menu)}
              className="text-4xl cursor-pointer relative family3"
            >
              <motion.span
                animate={!menu ? "animate" : "initial"}
                variants={opacityVariants}
              >
                MENU
              </motion.span>
              <motion.span
                animate={menu ? "animate" : "initial"}
                variants={opacityVariants}
                className="absolute left-0 top-0"
              >
                CLOSE
              </motion.span>
            </h1>
          </div>
          <div className="flex items-center justify-end gap-6">
            <h4 className="text-lg family4">Menu</h4>
            <h4 className="text-lg flex items-center gap-2 family4">
              <BiCart />
              Cart
            </h4>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {menu && <NavigationMenuBar menu={menu} />}
      </AnimatePresence>
    </>
  );
};

const NavigationMenuBar = ({ menu }) => {
  const heightVariants = {
    initial: {
      height: 0,
    },
    enter: {
      height: "auto",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },

    exit: {
      height: 0,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };
  return (
    <motion.div
      variants={heightVariants}
      initial="initial"
      animate={"enter"}
      className="w-full py-16 bg-[#F3EEE8] flex 
    items-center justify-center"
    >
      <ul className="flex flex-col gap-4">
        <li className="family4 text-4xl">Home</li>
        <li className="family4 text-4xl">Home</li>
        <li className="family4 text-4xl">Home</li>
        <li className="family4 text-4xl">Home</li>
      </ul>
    </motion.div>
  );
};

export default NavigationMenu;
