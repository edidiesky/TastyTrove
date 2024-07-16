"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import Loader from "@/components/home/loader";
import { handlePage } from "@/features/room/roomSlice";

const RoomsList = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading, page } = useSelector(
    (store) => store.room
  );
  return (
    <>
      {getallRoomisLoading && <Loader />}
      <div className="w-full bg-white shadows p-4 px-6 border rounded-[20px]">
        {/* <label
          htmlFor=""
          className="hidden md:flex text-xl text-dark w-[200px] lg:w-[250px]
             items-center gap-2 h-12 border rounded-[10px] bg-[#f9f9f9] px-4"
        >
          <div className="text-dark flex items-center justify-center">
            <BiSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-base text-dark flex-1"
          />
        </label> */}
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Room Name</th>
                  {/* <th>Location</th> */}
                  <th>City</th>
                  <th>Price</th>
                  <th>Date Created</th>
                  <th>Manage Room</th>
                </tr>
              </thead>
              <tbody>
                {rooms?.map((x, index) => {
                  return <TableCard x={x} type={"rooms"} key={x?._id} />;
                })}
              </tbody>
            </table>
          </div>
        </Table>
        <div className="w-full flex items-center justify-end gap-2">
          <div
            onClick={() => dispatch(handlePage("prev"))}
            className="p-3 rounded-2xl text-sm font-bold font-booking_font_bold px-4 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
          >
            Previous
          </div>
          {page}
          <div
            onClick={() => dispatch(handlePage("next"))}
            className="p-3 rounded-2xl text-sm font-bold font-booking_font_bold px-4 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomsList;
