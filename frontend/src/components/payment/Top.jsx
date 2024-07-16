"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RoomPaymentTab from "./RoomPaymentTab";
import { BiCheck, BiChevronLeft } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { slideup } from "@/constants/utils/framer";
import FlutterPaymentButton from "./FlutterPaymentButton";
export default function RoomInfo() {
  const { reservation, getsingleReservationisLoading } = useSelector(
    (store) => store.reservation
  );

  const ctaText_1 = useRef(null);
  const ctaText_2 = useRef(null);

  const inView = useInView(ctaText_1, {
    margin: "0px 100px -50px 0px",
  });
  const inView2 = useInView(ctaText_2, {
    margin: "0px 100px -50px 0px",
  });
  const ctaText1 = "Almost there!";
  const ctaText2 = "Complete your booking seamlessly";
  return (
    <>
      <div className="w-full py-20 flex flex-col gap-24 justify-end items-end">
        <div className="w-[90%] relative lg:w-[85%] mx-auto max-w-custom_1 justify-end items-end flex flex-col">
          <div className="w-full relative flex flex-col gap-20 justify-end">
            <div className="w-full grid relative grid-cols-1 md:items-center lg:grid-cols-custom_5 gap-4 lg:gap-24">
              <div className="flex pr-2 lg:pr-12 flex-col gap-12 w-full">
                {/* description */}
                <div className="w-full flex flex-col gap-8">
                  <div className="w-full flex flex-col md:flex-row md:items-center">
                    {/* <div className="w-8 md:-ml-8 h-8 bg-[#d8d8d8] rounded-full flex items-center justify-center text-xl">
                      <BiChevronLeft />
                    </div> */}
                    <h2
                      ref={ctaText_1}
                      className="text-4xl lg:text-5xl font-normal font-booking_font4 flex flex-wrap gap-x-[8px] gap-y-[8px]  leading-[1] 
                      font-booking_font3"
                    >
                      {ctaText1.split(" ").map((x, index) => {
                        return (
                          <span
                            key={index}
                            className="inline-flex hide relative"
                          >
                            <motion.span
                              variants={slideup}
                              custom={index}
                              initial="initial"
                              animate={inView ? "animate" : "exit"}
                            >
                              {x}
                            </motion.span>
                          </span>
                        );
                      })}
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-8 pb-6 border-b">
                    <li className="text-base font-booking_font font-normal">
                      One more step to complete your booking with Zyra&Stones
                      Living. Our payment platform ensures your payment details
                      are safe and secured.
                    </li>
                  </ul>
                </div>
                {/* payment features */}
                <div className="w-full flex flex-col gap-8">
                  <h2
                    ref={ctaText_2}
                    className="text-3xl lg:text-4xl font-normal flex font-booking_font4 flex-wrap gap-x-[8px] gap-y-[8px]  leading-[1] font-booking_font3"
                  >
                    {ctaText2.split(" ").map((x, index) => {
                      return (
                        <span key={index} className="inline-flex hide relative">
                          <motion.span
                            variants={slideup}
                            custom={index}
                            initial="initial"
                            animate={inView2 ? "animate" : "exit"}
                          >
                            {x}
                          </motion.span>
                        </span>
                      );
                    })}
                  </h2>
                  <ul className="flex flex-col gap-4 pb-12 border-b">
                    <li className="text-base flex items-center gap-2 font-booking_font font-normal">
                      <BiCheck fontSize={"24px"} /> Take advantage of our serene
                      environment to relax in comfort and luxury.
                    </li>

                    <li className="text-base flex items-start gap-2 font-booking_font font-normal">
                      <BiCheck fontSize={"24px"} /> Book with us to get the best
                      rates available. Get immediate confirmation of your
                      booking.
                    </li>
                    <li className="text-base flex items-center gap-2 font-booking_font font-normal">
                      <BiCheck fontSize={"24px"} /> 24/7 housekeeping is
                      included with every stay.
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <span className="text-sm font-booking_font font-normal">
                    All fees and charges will be inclusive of taxes. Exceptions
                    may apply in certain jurisdictions. For a list of
                    exceptions, please click{" "}
                    <span className="font-bold">here.</span>
                  </span>

                  {getsingleReservationisLoading ? (
                    <Skeleton width={"100%"} height={40} />
                  ) : (
                    <FlutterPaymentButton />
                  )}
                </div>
              </div>
              <div className="w-full sticky top-[10%] lg:w-[400px] flex flex-col gap-16">
                <RoomPaymentTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
