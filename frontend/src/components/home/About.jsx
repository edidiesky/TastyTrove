import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import AnimateTextWord from "@/animations/AnimateTextWord";
import Word from "@/animations/Word";
import { useSelector } from "react-redux";

import { motion, useInView } from "framer-motion";
import { clipPathLeft, smallslideup2 } from "@/constants/utils/framer";
import Image from "../common/Image";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    subText: "Check out Menu",
    title: "The best table in town",
    desc: "Sed aenean egestas ut aliquam turpis mauris, molestie. Vitae tellus tempor sem id tempus neque, tellus turpis turpis. Morbi tortor id gravida aliquet.",
  },
  {
    id: 2,
    subText: "View out Menu",
    title: "Perfect For Groups",
    desc: "Quam eu proin sit massa condimentum. Volutpat non pulvinar aliquet nunc. Orci elementum in aliquet a gravida vivamus aliquam turpis vitae.",
  },
  {
    id: 3,
    subText: "Check out Menu",
    title: "Fresh produce everyday",
    desc: "Hendrerit amet, volutpat leo non, commodo maecenas scelerisque tincidunt. Morbi vulputate morbi purus quisque sit sagittis orci elementum gravida.",
  },
];

export default function About() {
  const animateAbout = useRef(null);
  const animateImage = useRef(null);
  const inView2 = useInView(animateAbout, {
    margin: "0px 100px -120px 0px",
  });
  const inView = useInView(animateImage, {
    margin: "0px 100px -120px 0px",
  });

  const { menus } = useSelector((store) => store.menu);

  return (
    <AboutContent className="flex overflow-hidden w-full flex-col gap-4">
      <div className="w-full flex flex-col gap-16">
        <div className="w-85 md:px-12 auto wrapper flex gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-12">
            <h4 className="text-base max-w-[500px] md:text-xl family1 leading-[1.4]">
              <AnimateTextWord>
                HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper
                eget tortor, donec amet, blandit. Tristique facilisi faucibus
                elementum feugiat in nam in feugiat. Ipsum odio etiam duis
                facilisis amet vulputate.
              </AnimateTextWord>
            </h4>
            <h1 className="family3 text-6xl flex flex-col sm:text-7xl leading-[1.5]">
              <Word>Food is our common ground, a universal experience</Word>
            </h1>
            <h4 className="text-base max-w-[500px] md:text-xl family1 leading-[1.4]">
              <AnimateTextWord>
                HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper
                eget tortor, donec amet, blandit. Tristique facilisi faucibus
                elementum feugiat in nam in feugiat. Ipsum odio etiam duis
                facilisis amet vulputate.
              </AnimateTextWord>
            </h4>

            <div className="w-full py-2">
              {/* eslint-disable-next-line @next/next/no-img-element,
          @next/next/no-img-element */}
              <img
                alt=""
                width={0}
                sizes="100vw"
                height={0}
                loading="lazy"
                className="w-[150px]"
                src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/signature.jpg"
                // style={{ width: "200px" }}
              />
            </div>
          </div>
          <div
            ref={animateImage}
            className="flex-1 md:flex hidden aboutImageWrapper"
          >
            {/* eslint-disable-next-line @next/next/no-img-element,
          @next/next/no-img-element */}
            <motion.div
              variants={clipPathLeft}
              initial="initial"
              animate={inView ? "animate" : "exit"}
              className="w-full h-[40rem] group relative"
            >
              <Link
                to={`/restaurant/takeout/${menus[3]?.id}?category=${menus[3]?.category}`}
                className="w-full h-full relative group-hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute z-20 w-full h-full bg-[rgba(0,0,0,.5)]"></div>
                <Image
                  src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info22x.jpg"
                  alt=""
                />{" "}
                <div className="w-full flex z-30 items-center justify-center left-0 absolute bottom-5">
                  <h4 className="text-[#fff] text-xl uppercase flex items-center gap-4 family1">
                    <span className="leading-[1.3]">{menus[3]?.title}</span>-
                    <span className="family1 text-xl">₦{menus[3]?.price}</span>
                  </h4>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="w-90 auto">
          <div className="md:w-[80%] auto aboutBottom md:grid-cols-3 grid gap-2">
            {data.map((x, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div ref={animateAbout} className="w-full lg:py-12" key={index}>
                  <motion.header
                    key={x.id}
                    variants={smallslideup2}
                    custom={index}
                    initial="initial"
                    animate={inView2 ? "animate" : "exit"}
                    className="flex flex-col gap-2 w-full"
                  >
                    <h3 className="family3 text-center pb-3 text-4xl md:text-4xl font-normal">
                      {x.title}
                    </h3>
                    <h4 className="family1 text-center text-base md:text-lg font-normal">
                      {x.desc}
                    </h4>
                    <div className="w-full mt-4 text-center">
                      <button className="h-[60px] w-[200px]  overflow-hidden text-base">
                        <Link to={"/restaurant/menu"}>
                          <Button
                            bgColor={"#000"}
                            text={x?.subText}
                            type={"dark"}
                          />
                        </Link>
                      </button>{" "}
                      {/* <button className="btn text-dark family1 font-normal text-lg py-1"></button> */}
                    </div>
                  </motion.header>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AboutContent>
  );
}

const AboutContent = styled.div`
  padding: 8rem 0;
  .wrapper {
    @media (max-width: 980px) {
      flex-direction: column;
    }
  }
  .aboutImageWrapper {
    position: relative;
    min-height: 30rem;
    @media (max-width: 980px) {
      min-height: 85rem;
    }
    .imageWrapper {
      position: absolute;
    }
  }
  .aboutBottom {
    display: grid;
    padding-top: 5rem;
    grid-gap: 5rem;
  }
`;
