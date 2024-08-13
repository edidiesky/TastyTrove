import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { slideRight } from "@/constants/utils/framer";
export default function Plans() {
  const { menus } = useSelector((store) => store.menu);
  // Hors d’oeuvres
  // Main Course
  // Gin & Tonic
  const animateAbout = useRef(null);
  const inView = useInView(animateAbout, {
    margin: "0px 100px -120px 0px",
  });

  const maincourse = menus.filter((data) => data.category === "Main Course");
  const houres = menus.filter((data) => data.category === "Hors d’oeuvres");
  // get desserts collections
  const desserts = menus.filter((data) => data.category === "desserts");
  // const DRINK = menus.filter((data) => data.category === "DRINK & COCKTAIL");
  const plansList = [
    {
      title: "Hors d’oeuvres",
      data: houres,
    },
    {
      title: "Main Course",
      data: maincourse,
    },
    {
      title: "desserts",
      data: desserts,
    },
  ];

  return (
    <PlansContent>
      <div className="w-90 md:w-85 px-16 auto container">
        <div
          ref={animateAbout}
          className="w-full gap-8 md:gap-0 items-start grid md:grid-cols-3"
        >
          {plansList?.map((data, index) => {
            return (
              <motion.div
                key={index}
                variants={slideRight}
                custom={index}
                initial="initial"
                animate={inView ? "animate" : "exit"}
                className={`w-full ${
                  index === 1 ? "Card active text-[#fff]" : "Card text-[#000]"
                } flex-col gap-3`}
              >
                <div className="w-85 auto px-8 flex flex-col gap-12">
                  <h2 className={` family3 text-5xl uppercase text-start`}>
                    {data?.title}
                  </h2>
                  <div className="w-full flex flex-col gap-4">
                    {data?.data?.map((x, index) => {
                      return (
                        <div key={index} className=" w-full items-center flex">
                          <Link
                            to={`/restaurant/takeout/${x?.id}?category=${x?.category}`}
                            className="w-full"
                            key={index}
                          >
                            <li className="w-full auto flex flex-col gap-2 text-base center border-bottom py-1 auto">
                              <div className="flex w-full items-center gap-2 justify-space">
                                <div className="flex w-full justify-between gap-4 items-center">
                                  <h3 className={`family3 text-4xl text-dark`}>
                                    {x?.title}
                                  </h3>
                                  <span className={`text-xl text-dark`}>
                                    ${x?.price}
                                  </span>
                                </div>
                              </div>
                              <h4
                                className={`text-dark family2 text-xl`}
                                // className="family2 text-xl"
                              >
                                {x?.description}
                              </h4>
                            </li>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PlansContent>
  );
}

const PlansContent = styled.div`
  width: 100%;
  padding-top: 4rem;
  .btn2 {
    border: none;
    outline: none;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--green);
    background-color: transparent;
    padding: 1.4rem 2rem;
    margin-bottom: 2rem;
    &:hover {
      color: #fff;
    }
  }
  .top {
    color: #fff;
    &.active {
      background-color: var(--blue-2);
    }
  }
  .Card {
    background-color: #e8e8e8;
    width: 100%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: 6rem 0;
    gap: 5rem;
    &.active {
      margin-top: -100px;
      background-color: #000;
      @media (max-width: 780px) {
        margin: 0;
      }
    }
  }
  .grid2 {
    display: grid;
    width: 100%;
    padding: 8rem 0;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 0.09rem;
    grid-row-gap: 10rem;
  }
  .container {
    padding: 8rem 0;
  }
`;
