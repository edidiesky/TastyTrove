
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
    <div className="flex flex-col w-full gap-6">
      <div className="w-full flex flex-col gap-4">
        {payments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 w-full">
            <img
              src="/images/no_result.jpg"
              alt=""
              className="w-[300px] md:w-[400px]"
            />
            <span className="block text-base font-normal family5">
              You have no Orders
            </span>
          </div>
        ) : (
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
                    <th>Delivered</th>
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
        )}
        {payments?.length !== 0 && (
          <div className="w-full family1 flex items-center justify-end gap-4">
            <div
              onClick={() => dispatch(handlePage("prev"))}
              className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.2)]"
            >
              <BiChevronLeft />
            </div>
            {page}
            <div
              onClick={() => dispatch(handlePage("next"))}
              className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
            >
              {" "}
              <BiChevronRight />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
