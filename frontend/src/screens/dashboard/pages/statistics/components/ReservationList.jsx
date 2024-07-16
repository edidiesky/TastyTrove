"use client";
import React, { useEffect, useState } from "react";
import moment from 'moment'
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReservations } from "@/features/reservation/reservationReducer";

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
  const dispatch = useDispatch()
  const {reservations} = useSelector((store)=> store.reservation)

  useEffect(()=> {
    dispatch(GetAllReservations())
  },[])
  return (
    <div className="w-full border bg-white p-6 flex flex-col gap-4 shdow-xl rounded-[10px]">
      <h3 className="text-2xl font-booking_font4">Reservation History</h3>
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Booking Name</th>
                <th>Status</th>
                <th>Price</th>
                <th>Venue</th>
                <th>Checkin - CheckOut</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reservations?.map((x, index) => {
                return <TableCard x={x} type={"Reservation"} key={x?._id} />;
              })}
            </tbody>
          </table>
        </div>
      </Table>
    </div>
  );
};

export default ReservationList;
