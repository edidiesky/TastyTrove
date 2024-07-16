"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useSelector } from "react-redux";

const RoomsList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
    const { users, getallRoomisLoading } = useSelector((store) => store.auth);
  return (
    <div className="w-full p-4 px-6 bg-white border rounded-[20px]">
      <label
        htmlFor=""
        className="hidden md:flex text-xl text-dark w-[200px] lg:w-[250px]
             items-center gap-2 h-12 border rounded-[10px] bg-[#f9f9f9] px-4"
      >
        <div className="text-dark flex items-center justify-center">
          <BiSearch />
        </div>
        <input
          type="text"
          placeholder="Search for customers"
          className="bg-transparent border-none outline-none text-base text-dark flex-1"
        />
      </label>
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Customer Name</th>
                <th>Email</th>
                <th className=''>Role</th>
                <th>Date Created</th>
                <th>Manage Customer</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((x, index) => {
                return <TableCard x={x} type={"customerlist"} key={x?._id} />;
              })}
            </tbody>
          </table>
        </div>
      </Table>
      <div className="w-full flex items-center justify-end gap-2">
        <div className="p-4 rounded-2xl text-xs font-bold font-booking_font_bold border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]">
          Previous
        </div>
        <div className="p-4 rounded-2xl text-xs font-bold font-booking_font_bold border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]">
          Next
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
