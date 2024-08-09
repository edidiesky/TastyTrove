import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReservations } from "@/features/reservation/reservationReducer";
import { getAllMenuForAdmin } from "@/features/menu/menuReducer";

const reservation = [
  {
    user: "Villa Borghese Luxury",
    venue: "Lavana 4",
    type: "reservation",
    status: "booked",
    price: 44.8,
    endDate: "8/24/2024",
    startDate: "4/24/2024",
  },
  {
    user: "Villa Borghese Luxury",
    venue: "Lavana 2",
    type: "reservation",
    status: "canceled",
    price: 44.8,
    endDate: "8/24/2024",
    startDate: "4/24/2024",
  },
  {
    user: "Villa Borghese Luxury",
    venue: "Lavana 4",
    type: "reservation",
    status: "booked",
    price: 44.8,
    endDate: "8/24/2024",
    startDate: "4/24/2024",
  },
  {
    user: "Villa Borghese Luxury",
    venue: "Lavana 2",
    type: "reservation",
    status: "canceled",
    price: 44.8,
    endDate: "8/24/2024",
    startDate: "4/24/2024",
  },
];

const ReservationList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();
  const { menus, getallRoomisLoading, page } = useSelector(
    (store) => store.menu
  );
  const { recentSales, topSaledProduct } = useSelector((store) => store.stat);
  return (
    <div className="p-6 bg-[#fafafa] w-full px-6 py-8 flex-col rounded-[10px] min-h-[400px] flex gap-4">
      <h3 className="text-2xl md:text-3xl font-semibold family1">
        Recent Transaction
      </h3>
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
                <th>Date Created</th>
                <th>Currency</th>
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
    </div>
  );
};

export default ReservationList;
