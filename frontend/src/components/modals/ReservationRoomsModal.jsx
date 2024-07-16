"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
const ReservationRoomsModal = ({
  modal,
  setModal,
}) => {
    const [singlebeds, setSingleBeds] = useState(1);
    const [twinbeds, setTwinBeds] = useState(1);
    const [additionalbeds, setAdditionalBeds] = useState(1);
    const [guests, setGuests] = useState(2);
  const handleClearAlert = () => {
    setModal(false);
  };

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
        <div className="w-[100%] mx-auto flex flex-col gap-4">
          <div
            className="w-full py-4 sticky justify-between top-0 left-0
           bg-white z-20 flex gap-1"
          >
            <h3 className="text-2xl font-bold font-booking_font4">Add Rooms</h3>
            <div className="flex items-center gap-2">
              <div
                // onClick={() => setReservationModal(true)}
                className="p-3 cursor-pointer text-sm 
             bg-[#C5F244] btn px-8 font-booking_font rounded-[10px] font-bold text-dark"
              >
                Save
              </div>
              <div className="cross" onClick={handleClearAlert}>
                <RxCross2 />
              </div>
            </div>
          </div>
          <div className="w-full h-[30rem] px-2 overflow-auto z-8 grid md:grid-cols-1 gap-8">
            {/* basic information */}
            <div className="w-full flex flex-col gap-4">
              <h4 className="text-xl font-medium pb-4 border-b w-full">
                Basic Information
              </h4>
              <div className="w-full flex flex-col gap-4">
                <div className="w-full grid grid-cols-2 gap-1">
                  <label
                    htmlFor="Room Name"
                    className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                  >
                    Room Name
                    <input
                      type="text"
                      id="Room Name"
                      placeholder="Room Name"
                      className="input text-sm font-booking_font_normal"
                    />
                  </label>

                  <label
                    htmlFor="Room Type"
                    className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                  >
                    Room Type
                    <input
                      type="text"
                      id="Room Type"
                      placeholder="Room Type"
                      className="input text-sm font-booking_font_normal"
                    />
                  </label>
                </div>
                {/*  Room Description */}
                <label
                  htmlFor="Room Description"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Room Description
                  <textarea
                    id="Room Description"
                    placeholder="Room Description"
                    className="text-sm font-booking_font_normal h-[100px]"
                  />
                </label>
                {/*  Additional Equipments */}
                <label
                  htmlFor="Additional Equipments"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Additional Equipments
                  <textarea
                    id="Additional Equipments"
                    placeholder="Additional Equipments"
                    className="text-sm font-booking_font_normal h-[100px]"
                  />
                </label>
                {/*  Room Size */}
                <label
                  htmlFor="Room Size"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Room Size
                  <input
                    id="Room Size"
                    placeholder="Room Size"
                    className="text-sm font-booking_font_normal input"
                  />
                </label>
                {/*  Room Widget */}
                <label
                  htmlFor="Room Widget"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Room Widget
                  <input
                    id="Room Widget"
                    placeholder="Room Widget"
                    className="text-sm font-booking_font_normal input"
                  />
                </label>
              </div>
            </div>
            {/* // persons */}
            <div className="w-full flex flex-col gap-4">
              <h4 className="text-xl font-medium pb-4 border-b w-full">
                Persons
              </h4>
              {/* guests */}
              <div className="w-full grid grid-cols-2 gap-2">
                {/* guests */}
                <div className="w-full text-sm font-booking_font_normal flex flex-col gap-2">
                  <span className="text-bold text-dark">Number of Guests </span>
                  <div
                    className="flex items-center border p-3 rounded-[10px] justify-between"
                    style={{ gap: "1rem" }}
                  >
                    <button
                      onClick={() => setGuests(guests - 1)}
                      disabled={guests === 0}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiMinus fontSize={"18px"} />
                    </button>{" "}
                    <h4 className="fs-18 flex-1 text-center text-dark text-extra-bold">
                      {guests}
                    </h4>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiPlus fontSize={"18px"} />
                    </button>
                  </div>
                </div>{" "}
                {/* Additional Beds  */}
                <div className="w-full text-sm font-booking_font_normal flex flex-col gap-2">
                  <span className="text-bold text-dark">
                    Number of Additional Beds{" "}
                  </span>
                  <div
                    className="flex items-center border p-3 rounded-[10px] justify-between"
                    style={{ gap: "1rem" }}
                  >
                    <button
                      onClick={() => setAdditionalBeds(additionalbeds - 1)}
                      disabled={additionalbeds === 0}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiMinus fontSize={"18px"} />
                    </button>{" "}
                    <h4 className="fs-18 flex-1 text-center text-dark text-extra-bold">
                      {additionalbeds}
                    </h4>
                    <button
                      onClick={() => setAdditionalBeds(additionalbeds + 1)}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiPlus fontSize={"18px"} />
                    </button>
                  </div>
                </div>{" "}
              </div>
              <div className="w-full grid grid-cols-2 gap-2">
                {/* singlebeds */}
                <div className="w-full text-sm font-booking_font_normal flex flex-col gap-2">
                  <span className="text-bold text-dark">
                    Number of single beds{" "}
                  </span>
                  <div
                    className="flex items-center border p-3 rounded-[10px] justify-between"
                    style={{ gap: "1rem" }}
                  >
                    <button
                      onClick={() => setSingleBeds(singlebeds - 1)}
                      disabled={singlebeds === 0}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiMinus fontSize={"18px"} />
                    </button>{" "}
                    <h4 className="fs-18 flex-1 text-center text-dark text-extra-bold">
                      {singlebeds}
                    </h4>
                    <button
                      onClick={() => setSingleBeds(singlebeds + 1)}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiPlus fontSize={"18px"} />
                    </button>
                  </div>
                </div>{" "}
                {/* twinbeds Beds  */}
                <div className="w-full text-sm font-booking_font_normal flex flex-col gap-2">
                  <span className="text-bold text-dark">
                    Number of twin beds{" "}
                  </span>
                  <div
                    className="flex items-center border p-3 rounded-[10px] justify-between"
                    style={{ gap: "1rem" }}
                  >
                    <button
                      onClick={() => setTwinBeds(twinbeds - 1)}
                      disabled={twinbeds === 0}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiMinus fontSize={"18px"} />
                    </button>{" "}
                    <h4 className="fs-18 flex-1 text-center text-dark text-extra-bold">
                      {twinbeds}
                    </h4>
                    <button
                      onClick={() => setTwinBeds(twinbeds + 1)}
                      className="w-8 h-8 rounded-full flex bg-[#fafafa] items-center justify-center"
                    >
                      <BiPlus fontSize={"18px"} />
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
            {/* address data */}
            <div className="w-full flex flex-col gap-4">
              <h4 className="text-xl font-medium pb-4 border-b w-full">
                Address Data
              </h4>
              <div className="w-full flex flex-col gap-4">
                <label
                  htmlFor="Country /Region"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Country /Region
                  <input
                    type="text"
                    id="Country /Region"
                    placeholder="Country /Region"
                    className="input text-sm font-booking_font_normal"
                  />
                </label>

                <label
                  htmlFor="Street"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Street
                  <input
                    type="text"
                    id="Street"
                    placeholder="Enter your address"
                    className="input text-sm font-booking_font_normal"
                  />
                </label>

                <label
                  htmlFor="Postal Code"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  Postal Code
                  <input
                    type="text"
                    id="Postal Code"
                    placeholder="Enter your postal code"
                    className="input text-sm font-booking_font_normal"
                  />
                </label>

                <label
                  htmlFor="city"
                  className="text-sm font-booking_font_normal font-medium flex flex-col gap-2"
                >
                  City
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                    className="input text-sm font-booking_font_normal"
                  />
                </label>
              </div>
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
    max-width: 550px;
    min-width: 500px;
    display: flex;
    max-height: 50rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    padding: 1rem 1.5rem;
    gap: 2rem;
    border-radius: 6px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 980px) {
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
        border-radius: 10px;
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

export default ReservationRoomsModal;
