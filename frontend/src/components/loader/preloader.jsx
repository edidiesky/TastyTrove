import React, { useState, useEffect, useRef } from "react";
import { timeline } from "motion";
import { opacity1 } from "@/constants/utils/framer";
const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];
const Preloader = () => {
  const [index, setIndex] = useState(0);
  const countRef = useRef(null);
  const countRef2 = useRef(null);
  //   function get
  const getSectionHeight = (element) => {
    const { height } = element.getBoundingClientRect();
    const { childElementCount } = element;
    // console.log(childElementCount, height / childElementCount);
    return height / childElementCount;
  };

  useEffect(() => {
    if (countRef.current && countRef2?.current) {
      const transformAmount = getSectionHeight(countRef?.current);
      const transformAmount2 = getSectionHeight(countRef2?.current);
      //   console.log(transformAmount);
      const sequence = new Array(5).fill("").flatMap((_, index) => [
        [countRef?.current, { y: `-${transformAmount * (index + 1)}px ` }],
        [
          countRef2?.current,
          { y: `-${transformAmount2 * (index + 1)}px ` },
          { at: `-1.8` },
        ],
      ]);
      timeline(sequence, {
        defaultOptions: {
          easing: [0.77, 0, 0.175, 1],
          duration: 2,
        },
      });
    }
  }, []);
  return (
    <div className="">
      <div className="bg-[#988871] overlay_1 family1 h-screen pb-20 md:pb-24 flex items-end justify-end w-full fixed top-0 left-0 z-[4000000]">
        {/* <motion.p
        className="text-[#fff] text-3xl font-semibold family1"
        variants={opacity1}
        initial="initial"
        animate="enter"
      >
        <span></span>
        {words[index]}
      </motion.p> */}
        <div className="h-[20vh] md:h-[50vh] overflow-hidden min-h-[20vh] md:min-h-[50vh]">
          <ul className="counter-list" ref={countRef}>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                0
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                2
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                4
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                6
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                9
              </h3>
            </li>
          </ul>
        </div>

        <div className="h-[20vh] md:h-[50vh] min-h-[20vh] md:min-h-[50vh] overflow-hidden">
          <ul className="counter-list" ref={countRef2}>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                1
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                3
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                5
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                8
              </h3>
            </li>
            <li>
              <h3 className="md:text-[50vh] md:leading-[50vh] text-[20vh] leading-[20vh] text-[#fff]">
                9
              </h3>
            </li>
          </ul>
        </div>
      </div>
      {/* <div
        style={{ background: `#988871` }}
        className="overlay_2 fixed h-screen top-0 left-0 items-center justify-center w-full block"
      ></div> */}
    </div>
  );
};

export default Preloader;
