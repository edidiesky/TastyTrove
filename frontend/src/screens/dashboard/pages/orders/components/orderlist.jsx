"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useSelector } from "react-redux";

const OrderList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
    const { payments } = useSelector((store) => store.payment);
  return (
    <div className="w-full p-4 px-6 bg-white border rounded-[20px]">
     
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Description</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                {/* <th className=''>Location</th> */}
                <th>Date Created</th>
                {/* <th>View Details</th> */}
              </tr>
            </thead>
            <tbody>
              {payments?.map((x, index) => {
                return <TableCard x={x} type={"orderlist"} key={x?._id} />;
              })}
            </tbody>
          </table>
        </div>
      </Table>
      {/* <div className="w-full flex items-center justify-end gap-2">
        <div className="p-4 rounded-2xl text-base font-bold font-booking_font_bold border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]">
          Previous
        </div>
        <div className="p-4 rounded-2xl text-base font-bold font-booking_font_bold border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]">
          Next
        </div>
      </div> */}
    </div>
  );
};

export default OrderList;
