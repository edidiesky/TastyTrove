"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function RoomGallery() {
  const [tabindex, setTabIndex] = useState(0);
  const { room } = useSelector((store) => store.room);
  return (
    <div className="w-full relative overflow-hidden">
      {/* <div className="w-full h-full z-30 bg-[rgba(0,0,0,.5)] absolute top-0 left-0"></div> */}
      <div
        style={{ gridTemplateColumns: "repeat(4, 100%)" }}
        className="w-full h-[310px] md:h-[460px] overflow-hidden grid"
      >
        {room?.images?.map((image, index) => {
          return (
            <div
              style={{
                transform: `translateX(-${tabindex * 100}%)`,
                transition: "all .6s ease",
              }}
              key={index}
              className="w-full h-full"
            >
              <img
                key={index}
                alt="Cotion"
                loading="lazy"
                placeholder="blur"
                style={{
                  transition:
                    "filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                src={image}
                className={`w-full z-10 h-[310px] md:h-[460px] object-cover hover:grayscale-[1]`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-4 ">
        {/* <div
                  onClick={() => handleImagePosition("left")}
                  className="w-12 h-[100px] text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center z-[40]"
                >
                  <BiChevronLeft fontSize={"30px"} />
                </div> */}
        <div className="grid md:w-[400px] grid-cols-4 items-center gap-2">
          {room?.images?.slice(0, 4).map((image, index) => {
            return (
              <div
                onClick={() => setTabIndex(index)}
                key={index}
                className="relative h-[80px] md:h-[100px]"
              >
                <img
                  alt="Cotion"
                  loading="lazy"
                  style={{
                    transition:
                      "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  src={image}
                  className={`${
                    tabindex === index
                      ? "grayscale-[1] border-4 border-[rgba(0,0,0,1)]"
                      : "grayscale-[0] border-0"
                  } h-full object-cover cursor-pointer w-full hover:grayscale-[1] grayscale-0`}
                />
              </div>
            );
          })}
        </div>
        {/* <div
                  onClick={() => handleImagePosition("right")}
                  className="w-12 h-[100px] text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center z-[40]"
                >
                  <BiChevronRight fontSize={"30px"} />
                </div> */}
      </div>
    </div>
  );
}
