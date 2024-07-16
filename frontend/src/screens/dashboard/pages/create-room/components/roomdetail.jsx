"use client";
import React, { useState } from "react";

const RoomDetail = ({
  title,
  bathrooms,
  shortdescription,
  price,
  images,
  rooms,
}) => {

  return (
    <div className="w-full bg-[#fff] border p-6 rounded-[10px]">
      <div className="w-full flex flex-col gap-8">
        <h4 className="text-2xl font-booking_font4">Preview</h4>
        <div className="w-full flex flex-col gap-4">
          {images?.length > 0 ? (
            <img
              alt="Cotion"
              loading="lazy"
              style={{
                transition:
                  "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              src={images[0]}
              className="w-full h-[200px] rounded-lg object-cover hover:grayscale-[1] grayscale-0"
            />
          ) : (
            <>
              <div className="w-full h-[200px] bg-[#fafafa] border"></div>
            </>
          )}

          <div className="w-full flex flex-col gap-2">
            <h3 className="text-sm font-booking_font_bold text-text_dark_1 ">
              Title:{" "}
              <span className="font-booking_font4 text-2xl"> {title}</span>
            </h3>
            <div className="w-full flex flex-col gap-2">
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-xs font-booking_font_bold flex items-center text-dark "
              >
                Price:{" "}
                <span className="text-lg font-booking_font4">${price}</span>
              </h4>
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-xs flex items-center font-booking_font_bold text-dark "
              >
                Rooms:{" "}
                <span className="text-xl font-booking_font4"> {rooms}</span>{" "}
              </h4>
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-xs flex items-center font-booking_font_bold text-dark "
              >
                BathRooms:{" "}
                <span className="text-xl font-booking_font4"> {bathrooms}</span>{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
