"use client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero";
import RoomLists from "./RoomLists";
import RecommendedList from "./RecommendedList";
import Navbar from "../common/navbar";
import Footer from "../common/Footer";
import Loader from "../home/loader";
import { getAllRooms, getSingleRooms } from "@/features/room/roomReducer";
export default function BookingItem() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSingleRooms(id));
      dispatch(getAllRooms());
    }
  }, [id]);
  const { rooms, getsingleRoomisLoading } = useSelector((store) => store.room);
  if (getsingleRoomisLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <Hero />
      <RoomLists />
      <RecommendedList roomid={id} />
      <Footer />
    </div>
  );
}
