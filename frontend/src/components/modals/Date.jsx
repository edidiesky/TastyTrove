"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
// import DateInput from "../forms/DateInput";
const ModalVariants = {
  initial: {
    opacity: 0,
    y: "100vh",
    
  },
  enter: {
    opacity: 1,
    y: "0",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
const DateModal = ({
  modal,
  setModal,
  setChildren,
  children,
  adults,
  setAdults,
  handleSelect,
  dateRange,
}) => {
  const handleClearAlert = () => {
    setModal(false);
  };
  let limit = adults + children;
  return (
    <DateModalStyles
      as={motion.div}
      initial={{ opacity: 0}}
      exit={{ opacity: 0}}
      animate={{ opacity: 1 }}
    >
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={modal ? "enter" : "exit"}
        exit="exit"
        className="dateModalCard"
      >
        {/* <div className="w-[95%] z-30 mx-auto flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-2xl font-bold font-booking_font2">
              Select the dates of your stay
            </h3>
            <div className="cross" onClick={handleClearAlert}>
              <RxCross2 />
            </div>
          </div>
          <div className="w-full">
            <DateInput handleSelect={handleSelect} dateRange={dateRange} />
          </div>

          <div className="w-full flex justify-end">
            <div onClick={handleClearAlert} className="p-4 text-center cursor-pointer text-sm font-booking_font_bold text-white btn px-8 rounded-[40px] font-bold text-dark">
              Done
            </div>
          </div>
        </div> */}
      </motion.div>
    </DateModalStyles>
  );
};
const DateModalStyles = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 4900;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  .dateModalCard {
    max-width: 800px;
    min-width: 840px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    padding:2rem;
    gap: 2rem;
    border-radius: 6px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 780px) {
      max-width: 90%;
      min-width: 90%;
    }
    .cross {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #d9d8d8;
      }
      svg {
        font-size: 20px;
      }
    }
  }
`;

export default DateModal;
