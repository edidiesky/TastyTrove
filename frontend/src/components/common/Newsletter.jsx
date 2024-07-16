
import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { slideup } from "@/constants/utils/framer";
import AnimateText from "@/animations/AnimateText";
const Newsletter = () => {
  const text_ref = useRef(null);
  const button_ref = useRef(null);
  const inView1 = useInView(text_ref, {
    margin: "0px 100px -100px 0px",
  });
  const RoomFlex_text_2 = [
    `Sign up to our newsletter to get the latest news and updates from us. `,
    `Stay connected as we bring the best deals and experiences right to your mailbox`,
    `We'll only send you important updates so no need to worry about spam.`,
  ];
  const inView2 = useInView(button_ref, {
    margin: "0px 100px -100px 0px",
  });

  return (
    <div
      className="w-full mt-12 py-32 relative flex items-center justify-center
   gap-8"
    >
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.6)] absolute top-0 left-0"></div>
      <img
        src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/parallax-5.jpeg"
        alt=""
        className="absolute z-10 object-cover top-0 left-0 h-full w-full"
      />
      <div
        className="w-[90%] mx-auto max-w-custom_1 z-40 flex items-center justify-center flex-col
       gap-4"
      >
        <h1
          ref={text_ref}
          className="text-white md:text-center leading-[1.3] text-5xl md:text-6xl font-booking_font4"
        >
          <span
            style={{ letterSpacing: "4px" }}
            className="text-base pb-5 font-semibold uppercase block font-booking_font"
          >
            <span className="w-full gap-x-[5px] flex md:justify-center items-center flex-wrap ">
              {["GET", "UPDATES", "REGULARY"].map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </span>
          <span className="w-full gap-x-[8px] flex flex-wrap ">
            {["Subscribe", "to", "our", "", "Newsletter"].map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    animate={inView1 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
          <span className="text-sm lg:text-lg w-full lg:w-[700px] md:mx-auto pt-6 font-normal block font-booking_font">
            <span className="w-full gap-x-[8px] flex md:justify-center flex-wrap ">
              {RoomFlex_text_2.map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </span>
        </h1>
        <div className="w-full mt-8 lg:w-[700px] lg:flex-row flex-col  items-center justify-center flex gap-2">
          <input
            type="text"
            placeholder="Your Email address"
            className="input text-base w-full flex items-center"
          />
          <div className="btn min-h-[55px] rounded-[10px] w-full items-center justify-center flex text-white md:w-[250px] btn-2">
            <AnimateText children={"Subscribe Now"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
