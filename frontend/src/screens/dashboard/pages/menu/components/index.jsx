"use client";
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./menu"
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuForAdmin } from "@/features/menu/menuReducer";
// import { getAllRoomsForAdmin } from "@/features/menu/roomReducer";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { deleteRoomisSuccess, page } = useSelector((store) => store.menu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenuForAdmin());
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
          <h3 className="text-4xl lg:text-5xl font-bold family1">
            Summary of <br /> your Menu
            <span className="block pt-3 text-base font-normal">
              Make a review of your menu created either by adding or modifying
              their content
            </span>
          </h3>
          <div className="flex items-center lg:justify-end gap-2">
            <Link
              to={"/dashboard/menu/create-room"}
              className="p-3 btn btn-4 cursor-pointer text-sm px-4 family1 
             rounded-[10px]  text-[#fff]"
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
