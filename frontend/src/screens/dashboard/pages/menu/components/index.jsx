import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./menu";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuForAdmin } from "@/features/menu/menuReducer";
import Loader from "@/components/loader";
import Button from "@/components/common/Button";
// import { getAllRoomsForAdmin } from "@/features/menu/roomReducer";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { getallMenuisLoading, page } = useSelector((store) => store.menu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenuForAdmin());
  }, [page]);
  if (getallMenuisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {roommodal && (
          <ReservationRoomsModal modal={roommodal} setModal={setRoomModal} />
        )}
      </AnimatePresence>
      <div className="w-full pb-20 flex flex-col gap-4">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-8 justify-between">
          <h3 className="text-3xl block lg:text-4xl family6">
            Menu Summary
            <span className="block pt-3 family1 text-sm font-normal">
              Make a review of your menu created either by adding or modifying
              their content
            </span>
          </h3>
          <div className="flex items-center lg:justify-end gap-2">
            <div className="flex items-center md:justify-end">
              <Link
                to={"/dashboard/menu/create-menu"}
                className="h-[50px] border md:h-[53px] min-w-[100px] hover:text-white md:min-w-[140px] text-xs md:text-sm family1 rounded-[40px]"
              >
                <Button
                  type={"white"}
                  bgColor={"#000"}
                  text={"Add a menu"}
                />
              </Link>
            </div>
          </div>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
