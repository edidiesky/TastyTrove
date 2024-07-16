"use client";
import React from "react";
import RoomCard from "../../common/RoomCard";
import { useSelector } from "react-redux";
import Loader from "@/components/home/loader";
import { Link } from "react-router-dom";
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
          Saved Rooms
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
              <span className="text-white">Saved Room</span>
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
  const { savedRooms, wishisLoading } = useSelector(
    (store) => store.favourites
  );
  return (
    <div
      className="w-full relative py-24 flex items-center justify-center
   gap-8"
    >
      {wishisLoading && <Loader />}
      <div
        className="w-[90%] relative mx-auto max-w-custom_1 z-40 flex items-start justify-center flex-col
       gap-12"
      >
        <div className="w-full">
          {savedRooms?.length === 0 ? (
            <h1 className="text-dark text-start leading-[1.3] text-4xl font-booking_font4">
              You have an empty Saved Rooms
              <Link
                to={"/search"}
                style={{ letterSpacing: "4px" }}
                className="text-[9px] md:text-xs font-normal pb-1 pt-3 w-[300px] border-b border-[rgba(0,0,0,.5)] uppercase flex items-center gap-4 font-booking_font"
              >
                Visit our rooms collections
              </Link>
            </h1>
          ) : (
            <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
              {savedRooms?.map((apartment, index) => {
                return (
                  <RoomCard type={"Search"} key={index} apartment={apartment} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
