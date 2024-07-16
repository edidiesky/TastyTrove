"use client";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleReservation } from "@/features/reservation/reservationReducer";
export default function RoomPaymentTab() {
  // get the reservation Id from the search parameter
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reservation, getsingleReservationisLoading } = useSelector(
    (store) => store.reservation
  );

  useEffect(() => {
    dispatch(GetSingleReservation(id));
  }, [id]);
  // const { reservation, loading } = useGetReservationById(reservationId);
  const startDate = moment(reservation?.startDate).format("MMMM Do");
  const endDate = moment(reservation?.endDate).format("MMMM Do");
  let date1 = moment(reservation?.startDate);
  let date2 = moment(reservation?.endDate);
  const differenceInDays = date2.diff(date1, "days"); // Convert milliseconds to days
  // console.log(differenceInDays);

  // const
  return (
    <>
      {getsingleReservationisLoading ? (
        <div className="w-full shadow-lg flex flex-col gap-2">
          <Skeleton width={"100%"} height={260} />
          <Skeleton width={"60%"} height={30} />
          <Skeleton width={"40%"} height={10} />
          <div className="w-full flex items-center justify-between gap-2">
            <Skeleton width={"40%"} height={10} />
            <Skeleton width={"40%"} height={10} />
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <Skeleton width={"40%"} height={10} />
            <Skeleton width={"40%"} height={10} />
          </div>{" "}
          <div className="w-full flex items-center justify-between gap-2">
            <Skeleton width={"40%"} height={10} />
            <Skeleton width={"40%"} height={10} />
          </div>
          <Skeleton width={"100%"} height={40} />
        </div>
      ) : (
        <div className="w-full flex-col gap-8">
          <div className="border shadow-2xl rounded-xl overflow-hidden flex flex-col w-full">
            <img
              alt="Cotion"
              loading="lazy"
              src={reservation?.rooms?.images[0]}
              className="image object-cover w-full h-[300px]"
            />
            <div className="w-full flex flex-col gap-2">
              <div className="flex p-8 pb-6 border-b-4 flex-col w-full gap-2">
                <span className="text-sm font-booking_font font-normal">
                  {reservation?.rooms?.bedroom} Bedroom |{" "}
                  {reservation?.rooms?.guests} Guests
                </span>
                <h1 className="text-3xl w-full font-medium font-booking_font4">
                  {reservation?.rooms?.title}
                </h1>
                <span className="text-sm font-booking_font font-normal">
                  {reservation?.rooms?.city}
                </span>
                {/* date and guests */}
                <div className="py-3 flex items-center justify-between w-full">
                  {/* date */}
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-booking_font_bold font-bold">
                      Dates
                    </span>
                    <span className="text-base font-booking_font font-normal">
                      {startDate} - {endDate}
                    </span>
                  </div>

                  {/* guests */}
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-booking_font_bold font-bold">
                      Guests
                    </span>
                    <span className="text-base font-booking_font font-normal">
                      {reservation?.guests} guest
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full flex p-4 pb-6 px-8 border-b-4 flex-col gap-2">
                {/* price */}
                <div className="w-full text-base font-normal font-booking_font flex items-center justify-between">
                  <span>
                    {reservation?.rooms?.price} x {differenceInDays} nights
                  </span>
                  <span>
                    <span className="text-base">₦</span>
                    {Number(reservation?.totalPrice).toLocaleString()}{" "}
                  </span>
                </div>
                {/* taxes */}
                <div className="w-full text-base pb-4 font-normal font-booking_font flex items-center justify-between">
                  <span>Fees and taxess</span>
                  <span>
                    <span className="text-base">₦</span>
                    {Number(reservation?.totalPrice).toLocaleString()}{" "}
                  </span>
                </div>
                {/* total */}
                <div className="w-full text-lg font-normal font-booking_font pt-4 border-t flex items-center justify-between">
                  <span className="font-bold font-booking_font_bold">
                    Total Cash
                  </span>
                  <span className="font-bold font-booking_font_bold">
                    <span className="text-base font-normal font-booking_font">
                      ₦
                    </span>
                    {Number(reservation?.totalPrice).toLocaleString()}{" "}
                  </span>
                </div>
              </div>
              <div className="w-full flex p-4 px-8 flex-col gap-2">
                {/* price */}
                <div className="w-full text-lg font-normal font-booking_font flex items-center justify-between">
                  <span className="font-bold font-booking_font_bold">
                    Total Cash
                  </span>
                  <span className="font-bold font-booking_font_bold">
                    <span className="text-base font-normal font-booking_font">
                      ₦
                    </span>
                    {Number(reservation?.totalPrice).toLocaleString()}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
