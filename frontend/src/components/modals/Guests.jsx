"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { BiMinus, BiPlus } from "react-icons/bi";
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
const GuestsModal = ({
  modal,
  setModal,
  setChildrens,
  childrens,
  adults,
  setAdults,
}) => {
  const handleClearAlert = () => {
    setModal(false);
  };
   let limit = adults + childrens;
  return (
    <DeleteContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={modal ? "enter" : "exit"}
        exit="exit"
        className="guestModalCard"
      >
        <div className="w-[95%] mx-auto flex flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-2xl font-bold font-booking_font4">
              Edit Travelers
            </h3>
            <div className="cross" onClick={handleClearAlert}>
              <RxCross2 />
            </div>
          </div>

          <div className="w-full flex flex-col gap-8">
            <div className="w-full fs-16 flex items-center justify-between">
              <span className="text-bold text-dark">
                Adults{" "}
                <div className="block fs-14 text-light text-dark">Age 13+</div>
              </span>
              <div
                className="flex items-center justify-end"
                style={{ gap: "1rem" }}
              >
                <button
                  onClick={() => setAdults(adults - 1)}
                  disabled={adults === 0}
                  className="w-12 h-12 rounded-full flex bg-[#fafafa] items-center justify-center"
                >
                  <BiMinus fontSize={"18px"} />
                </button>{" "}
                <h4 className="fs-18 flex-1 text-dark text-extra-bold">
                  {adults}
                </h4>
                <button
                  disabled={limit >= 6}
                  onClick={() => setAdults(adults + 1)}
                  className="w-12 h-12 rounded-full flex bg-[#fafafa] items-center justify-center"
                >
                  <BiPlus fontSize={"18px"} />
                </button>
              </div>
            </div>{" "}
            <div className="w-full fs-16 flex items-center justify-between">
              <span className="text-bold text-dark">
                Children{" "}
                <div className="block fs-14 text-light text-dark">
                  Age 2 - 12
                </div>
              </span>
              <div
                className="flex items-center justify-end"
                style={{ gap: "1rem" }}
              >
                <button
                  onClick={() => setChildrens(childrens - 1)}
                  disabled={childrens === 0}
                  className="w-12 h-12 rounded-full flex bg-[#fafafa] items-center justify-center"
                >
                  <BiMinus fontSize={"18px"} />
                </button>{" "}
                <h4 className="fs-18 flex-1 text-dark text-extra-bold">
                  {childrens}
                </h4>
                <button
                  disabled={limit >= 6}
                  onClick={() => setChildrens(childrens + 1)}
                  className="w-12 h-12 rounded-full flex bg-[#fafafa] items-center justify-center"
                >
                  <BiPlus fontSize={"18px"} />
                </button>
              </div>
            </div>{" "}
          </div>

          <h5 className="text-sm font-normal text-dark text-center">
            You can search for up to 6 travelers
          </h5>

          <div className="w-full flex justify-center">
            <div
              onClick={handleClearAlert}
              className="p-4 text-center w-full cursor-pointer 
            font-booking_font_bold
            bg-[#C5F244] px-8 rounded-[40px] font-bold text-dark"
            >
              Search
            </div>
          </div>
        </div>
      </motion.div>
    </DeleteContainer>
  );
};
const DeleteContainer = styled(motion.div)`
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
  .guestModalCard {
    max-width: 400px;
    min-width: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    padding: 1rem 2rem;
    gap: 2rem;
    border-radius: 6px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
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
    .deleteCardBottom {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2rem;
      gap: 1rem;
      button {
        padding: 1.2rem 2rem;
        border: none;
        font-size: 1.3rem;
        font-weight: 400;
        background: var(--grey-2);
        color: #fff;
        outline: none;
        border-radius: 40px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: var(--grey-1);
          color: var(--text-color);
        }
        &.deleteBtn {
          background: var(--blue-1);
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
  }
`;

export default GuestsModal;
