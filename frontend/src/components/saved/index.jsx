import React, { useEffect } from "react";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { GetUserFavouriteRooms } from "@/features/favourites/favouritesReducer";
import Cartindex from "./Cart";
const HomeIndex = () => {
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch(GetUserFavouriteRooms());
  // },[])
  return (
    <div className="bg-[var(--light-grey)] w-full flex flex-col">
      <Cartindex />
      <Footer />
    </div>
  );
};

export default HomeIndex;
