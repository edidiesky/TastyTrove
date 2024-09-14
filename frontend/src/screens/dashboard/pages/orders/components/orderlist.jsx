
import React, { useState } from "react";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { handlePage } from "@/features/menu/menuSlice";
const OrderList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const { payments, page } = useSelector((store) => store.payment);
  return (
    <div className="w-full bg-[#FAFAFA] min-h-[170px] items-center flex p-4 px-6 rounded-[20px]">
      {payments?.length === 0 ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-semibold family1">
            No Transactions
          </h3>
          <span className="block text-sm font-normal">
            You have not recorded any sales
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
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
                    <th>View Details</th>
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
          <div className="w-full text-xl flex items-center justify-end gap-4">
            <div
              onClick={() => dispatch(handlePage("prev"))}
              className="p-3 rounded-2xl text-xl font-bold font-booking_font_bold px-4
             border hover:opacity-[.8]
             cursor-pointer border-[rgba(0,0,0,0.3)]"
            >
              <BiChevronLeft />
            </div>
            {page}
            <div
              onClick={() => dispatch(handlePage("next"))}
              className="p-3 rounded-2xl text-xl font-bold 
            font-booking_font_bold px-4 border 
            hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
            >
              <BiChevronRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
