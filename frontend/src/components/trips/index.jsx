import React, { useEffect } from "react";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { GetUserReservations } from "@/features/reservation/reservationReducer";
import Banner from "../common/Banner";
const HomeIndex = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GetUserReservations());
  // }, []);
  return (
    <div className="bg-[var(--light-grey)] w-full flex flex-col">
      <Banner
        text={"Reservations"}
        subtext={"BEST TABLE IN TOWN"}
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/hero12x.jpg"
        }
      />
      <Footer />
    </div>
  );
};

export default HomeIndex;
