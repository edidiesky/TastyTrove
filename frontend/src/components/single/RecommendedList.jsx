"use client";
import Skeleton from "react-loading-skeleton";
import RoomCard from "../common/RoomCard";
import { apartmentDataList } from "@/data/apartmentData";
import { useSelector } from "react-redux";

const RecommendedList = ({ roomid }) => {
  // const { loading, error, rooms } = useRooms();
  const { room, rooms, getallRoomisLoading } = useSelector(
    (store) => store.room
  );
  const newRooms = rooms?.filter((room, index) => room?.id !== roomid);
  return (
    <div className="w-full py-8 md:mt-8 flex flex-col gap-8">
      <div className="w-[90%]  max-w-custom mx-auto flex flex-col gap-12">
        <h3 className="text-4xl md:text-5xl font-booking_font4">
          Similar Rooms
          <span className="block pt-3 text-lg font-booking_font font-normal text-grey">
            Enjoy the comforts of home and beyond with these distinctive
            features.
          </span>
        </h3>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {getallRoomisLoading ? (
            <>
              {apartmentDataList?.slice(0, 3).map((apartment, index) => {
                return (
                  <div key={index} className="w-full flex flex-col gap-2">
                    <Skeleton key={index} width={"100%"} height={200} />
                    <div className="border bg-white p-6 flex flex-col gap-3">
                      <Skeleton key={index} width={"30%"} height={10} />
                      <Skeleton key={index} width={"60%"} height={30} />
                      <Skeleton key={index} width={"30%"} height={10} />
                      <Skeleton key={index} width={"20%"} height={10} />
                      <Skeleton key={index} width={"10%"} height={10} />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {newRooms?.slice(0, 3)?.map((apartment, index) => {
                return (
                  <RoomCard
                    index={index}
                    type={"Search"}
                    apartment={apartment}
                    // currentUser={currentUser}
                    key={index}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecommendedList;
