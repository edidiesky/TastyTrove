import React, { useEffect } from "react";
import Widget from "./widget";
import ReservationList from "./ReservationList";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
const DashboardIndex = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { getStatisLoading } = useSelector((store) => store.stat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminStat());
  }, []);
  if (getStatisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-12">
        <h2 className="text-3xl lg:text-4xl font-booking_font4">
          Dashboard
          <span className="text-sm pt-3 block text-dark font-booking_font_bold font-semibold family1">
            <span className="font-normal font-booking_font text-sm text-dark">
              Welcome back,
            </span>{" "}
            {currentUser?.name}
          </span>
        </h2>
        <Widget />
        <Statistics />
        <ReservationList />
      </div>
      {/* <DashboardBanner/> */}
    </div>
  );
};

export default DashboardIndex;
