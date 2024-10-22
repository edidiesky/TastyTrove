import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useDispatch, useSelector } from "react-redux";

const ReservationList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();
  const { menus, getallRoomisLoading, page } = useSelector(
    (store) => store.menu
  );
  const { recentSales, topSaledProduct } = useSelector((store) => store.stat);
  return (
    <div className="px-6 py-8 border rounded-lg flex flex-col w-full gap-6">
      <h3 className="text-xl md:text-2xl font-semibold family6">
        Recent Transaction
      </h3>
      {recentSales?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 w-full">
          <img src="/images/no_result.jpg" alt="" className="w-[300px] md:w-[400px]" />
          <span className="block text-base font-normal family5">
            You have not sold any product
          </span>
        </div>
      ) : (
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Transaction ID</th>
                  {/* <th>Location</th> */}
                  <th>Customer</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th>Date Created</th>
                  {/* <th>Currency</th> */}
                </tr>
              </thead>
              <tbody>
                {recentSales?.slice(0, 3).map((x, index) => {
                  return <TableCard x={x} type={"sales"} key={x?.id} />;
                })}
              </tbody>
            </table>
          </div>
        </Table>
      )}
    </div>
  );
};

export default ReservationList;
