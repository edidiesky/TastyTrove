"use client";
import React, { useEffect } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { apartmentDataList } from "../../../data/apartmentData";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "@/features/room/roomReducer";
import Loader from "@/components/home/loader";
const MainContent = () => {
  return (
    <div className="w-full relative min-h-[100vh] flex flex-col">
      <Hero />
      <RoomLists />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="w-full min-h-[47vh] py-32 relative flex items-center justify-center
   gap-8"
    >
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.6)] absolute top-0 left-0"></div>
      <img
        src="/images/hazel_8.jpeg"
        alt=""
        className="absolute z-10 object-cover top-0 left-0 h-full w-full"
      />
      <div
        className="w-[90%] mx-auto z-40 flex items-center justify-center flex-col
       gap-4"
      >
        <h1 className="text-white text-center leading-[1.3] text-5xl md:text-6xl font-booking_font4">
         Our Collections
        </h1>
        <div className="w-full absolute bottom-0 left-0 z-[35] flex items-center justify-center py-8">
          <div className="w-[90%] lg:w-[50%] mx-auto grid grid-cols-2  sm:grid-cols-4 items-center justify-center gap-4 max-w-custom_1 h-full">
            <span
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
            >
              <div className="w-6 h-6 rounded-full bg-white text-dark flex items-center justify-center">
                1
              </div>{" "}
              <span className="text-white">Search</span>
            </span>

            <span
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
            >
              <div className="w-6 h-6 rounded-full border-white border text-white flex items-center justify-center">
                2
              </div>{" "}
              <span className="text-white">BOOKING</span>
            </span>

            <span
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
            >
              <div className="w-6 h-6 rounded-full border-white border text-white flex items-center justify-center">
                3
              </div>{" "}
              <span className="text-white">CHECKOUT</span>
            </span>

            <span
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
            >
              <div className="w-6 h-6 rounded-full border-white border text-white flex items-center justify-center">
                4
              </div>{" "}
              <span className="text-white">THANK YOU</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomLists = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);
  return (
    <div
      className="w-full relative py-24 flex items-center justify-center
   gap-8"
    >
      <div
        className="w-[90%] relative mx-auto max-w-custom_1 z-40 grid lg:grid-cols-1 items-start lg:justify-center flex-col
       gap-12"
      >
        {/* <div className="w-[90%] lg:sticky top-[11%] flex flex-col gap-8">
          <div className="w-full py-12 flex items-center justify-center lg:w-[400px] bg-[#1C1C1C]">
            <div className="w-[90%] mx-auto grid grid-cols-2 gap-4">
              <div className="py-8 cursor-pointer bg-[#151515] flex items-center justify-center flex-col gap-4">
                <span className="uppercase text-sm text-white">CHECK-IN</span>
                <div className="flex items-center gap-2">
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-4xl text-[var(--gold-1)] pt-3 md:text-6xl block font-booking_font4 uppercase leading-[1.5] text-center text-dark"
                  >
                    19
                  </span>
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-[8px] text-[var(--gold-1)] md:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                  >
                    JUN
                    <BiChevronDown fontSize={"24px"} />
                  </span>
                </div>
              </div>
              <div className="py-8 cursor-pointer bg-[#151515] flex items-center justify-center flex-col gap-4">
                <span className="uppercase text-sm text-white">CHECK-Out</span>
                <div className="flex items-center gap-2">
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-4xl text-[var(--gold-1)] pt-3 md:text-6xl block font-booking_font4 uppercase leading-[1.5] text-center text-dark"
                  >
                    19
                  </span>
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-[8px] text-[var(--gold-1)] md:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                  >
                    JUN
                    <BiChevronDown fontSize={"24px"} />
                  </span>
                </div>
              </div>
              <div className="py-8 cursor-pointer bg-[#151515] flex items-center justify-center flex-col gap-4">
                <span className="uppercase text-sm text-white">GUEsTS</span>
                <div className="flex items-center gap-2">
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-4xl text-[var(--gold-1)] pt-3 md:text-6xl block font-booking_font4 uppercase leading-[1.5] text-center text-dark"
                  >
                    19
                  </span>
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-[8px] text-[var(--gold-1)] md:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                  >
                    <BiChevronDown fontSize={"24px"} />
                    <BiChevronUp fontSize={"24px"} />
                  </span>
                </div>
              </div>
              <div className="py-8 cursor-pointer bg-[#151515] flex items-center justify-center flex-col gap-4">
                <span className="uppercase text-sm text-white">Nights</span>
                <div className="flex items-center gap-2">
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-4xl text-[var(--gold-1)] pt-3 md:text-6xl block font-booking_font4 uppercase leading-[1.5] text-center text-dark"
                  >
                    19
                  </span>
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-[8px] text-[var(--gold-1)] md:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                  >
                    <BiChevronDown fontSize={"24px"} />
                    <BiChevronUp fontSize={"24px"} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 border-t border-b px-4 w-full text-xl">
            <div className="flex items-center justify-between w-full">
              <h4 className="font-booking_font4">Maximum Price:</h4>
              <h4 className="font-booking_font4">₦100,000</h4>
            </div>
          </div>
        </div> */}
        {/* <div className="w-full">
          {getallRoomisLoading ? (
            <Loader />
          ) : (
            <div className=" gap-8 w-full grid md:grid-cols-2">
              {rooms?.map((apartment, index) => {
                return (
                  <RoomCard type={"Search"} key={index} apartment={apartment} />
                );
              })}
            </div>
          )}
        </div> */}
        {getallRoomisLoading ? (
          <Loader />
        ) : (
          <div className=" gap-8 w-full grid md:grid-cols-3">
            {rooms?.map((apartment, index) => {
              return (
                <RoomCard type={"Search"} key={index} apartment={apartment} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
