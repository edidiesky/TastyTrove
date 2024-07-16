"use client";
import React, { useRef } from "react";
import { RoomFeaturesList, RoomFeaturesList2 } from "@/constants/data/feature";

export default function RoomFeatures() {
  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col gap-12 border-b py-8 pb-24">
          <h3 className="text-3xl font-booking_font4">
            Room Services
            <span className="block pt-3 text-base font-booking_font">
              Enjoy the comforts of home and beyond with these distinctive
              features.
            </span>
          </h3>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
            {RoomFeaturesList.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex text-sm md:text-base gap-4 font-normal items-center font-booking_font5"
                >
                  {x?.icon}
                  <span className="w-full"> {x.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
