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
  // useEffect(() => {
  //   dispatch(getAdminStat());
  // }, []);
  // if (getStatisLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-12">
        <h2 className="text-4xl lg:text-5xl font-bold family1">
          Your Growth <br /> Analytics
          <span className="text-sm pt-3 block text-dark family1 font-semibold family1">
            <span className="font-normal family1 text-sm text-dark">
              Welcome back,
            </span>{" "}
            {currentUser?.name}
          </span>
        </h2>
        <div className="flex flex-col gap-20">
          <Widget />
          <Statistics />
          <ReservationList />
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
