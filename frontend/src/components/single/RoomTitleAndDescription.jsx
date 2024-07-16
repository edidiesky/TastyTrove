"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
export default function RoomTitleAndDescription({ room }) {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        {/* title */}
        <div className="w-full py-12 mt-3  border-t border-b flex flex-col gap-6">
          <h4 className="text-lg leading-[1.8] block font-booking_font font-normal text-dark">
            Functional living space of one of our apartments{" "}
            <span className="text-xl text-[var(--gold-1)]">{room?.title}.</span>
          </h4>
          <h4 className="text-lg leading-[1.8] block font-booking_font font-normal text-dark">
            With our single bedroom in a gated estate, Lekki. Feel free to treat
            yourself to a luxurious getaway filled with comfort, relaxation and
            unforgettable memories.
            {/* {room?.description} */}
          </h4>
          {/* {room?.description} */}
          <h4 className="text-lg leading-[1.8] block font-booking_font font-normal text-dark">
            SLEEPS {room?.guests} People - {room?.bedroom} Bedroom,{" "}
            {room?.bathroom} Bathroom. - 1 Car MAX!
          </h4>
          <h4 className="text-xl font-booking_font_normal font-normal"></h4>
        </div>
      </div>
    </>
  );
}
