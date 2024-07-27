
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../common/Footer";
import Loader from "../home/loader";
import Details from "./Details";
// import { getAllRooms, getSingleRooms } from "@/features/menu/roomReducer";
export default function BookingItem() {
  const { food } = useParams();
  const dispatch = useDispatch();
// console.log()
  return (
    <div>
      <Details />
      <Footer />
    </div>
  );
}
