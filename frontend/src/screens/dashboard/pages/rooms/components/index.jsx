"use client";
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { deleteRoomisSuccess,page } = useSelector((store) => store.room);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomsForAdmin());
  }, [page]);
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {roommodal && (
          <ReservationRoomsModal modal={roommodal} setModal={setRoomModal} />
        )}
      </AnimatePresence>
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <h3 className="text-3xl lg:text-4xl font-booking_font4">
            My Rooms
            <span className="block pt-3 text-base font-booking_font">
              Make a review of your rooms created either by adding or modifying
              their content
            </span>
          </h3>
          <div className="flex items-center lg:justify-end gap-2">
            <Link
              to={"/dashboard/rooms/create-room"}
              className="p-3 btn cursor-pointer text-sm px-8 font-booking_font4 
             rounded-[10px]  text-white"
            >
              Add a room
            </Link>
          </div>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
