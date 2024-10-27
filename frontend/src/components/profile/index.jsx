import React, { useEffect } from "react";
import Navbar from "../common/navbar";
import MainContent from "./main/maincontent";
import Footer from "../common/Footer";
import Newsletter from "../common/Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { GetUserFavouriteRooms } from "@/features/favourites/favouritesReducer";
import { GetSingleUser } from "@/features/auth/authReducer";
const HomeIndex = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(store => store.auth)
  useEffect(() => {
    dispatch(GetSingleUser(currentUser?.id));
  }, [currentUser])

  return (
    <div className=" w-full flex flex-col">
      <Navbar />
      <div className="w-full flex relative gap-4">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default HomeIndex;
