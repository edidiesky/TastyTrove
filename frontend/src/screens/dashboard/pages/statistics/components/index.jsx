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
        <h3 className="text-3xl block lg:text-4xl family1 font-semibold">
          Welcome 👋
          <span className="block pt-3 text-base font-normal">
            Explore information and activity about your property
          </span>
        </h3>
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
