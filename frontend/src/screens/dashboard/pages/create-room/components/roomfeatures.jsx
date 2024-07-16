import { RoomFeaturesList, RoomFeaturesList2 } from '@/constants/data/feature';
import React from 'react';
const Roomfeatures = ({
  features,
  handleFeatureSelection,
}) => {
  return (
    <div className="w-full bg-[#fff] border p-6 px-2 rounded-[10px]">
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-2xl font-booking_font4">
            Room Attributes & Features
            <span className="font-normal font-booking_font text-base block">
              Share what makes your place special.
            </span>
          </h4>
        </div>
        <div className="pt-2 w-full flex flex-col gap-8">
          <div className="flex gap-4 flex-col w-full">
            <span className="font-booking_font4 text-base block">
              Room Features
            </span>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3">
              {RoomFeaturesList?.map((x, index) => {
                const active = features.includes(x);
                return (
                  <div
                    onClick={() => handleFeatureSelection(x)}
                    className={`${
                      active
                        ? "border-[rgba(0,0,0,.7)] bg-[#fafafa] border-2"
                        : "border-[rgba(0,0,0,.08)] border"
                    } flex w-full cursor-pointer hover:bg-[#fafafa] p-4 rounded-lg flex-col gap-2`}
                  >
                    {x?.icon}
                    <span className="text-sm font-booking_font">
                      {x?.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
{/* 
          <div className="flex gap-4 flex-col w-full">
            <span className="font-semibold font-booking_font_bold text-base block">
              Room Amenities
            </span>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3">
              {RoomFeaturesList2?.map((x, index) => {
                const active = amenities.includes(x);
                return (
                  <div
                    onClick={() => handleRoomAmenitiesSelection(x)}
                    className={`${
                      active
                        ? "border-[rgba(0,0,0,.7)] bg-[#fafafa] border-2"
                        : "border-[rgba(0,0,0,.08)] border"
                    } flex w-full cursor-pointer hover:bg-[#fafafa] p-4 rounded-lg flex-col gap-2`}
                  >
                    {x?.icon}
                    <span className="text-sm font-booking_font4">
                      {x?.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};


export default Roomfeatures;