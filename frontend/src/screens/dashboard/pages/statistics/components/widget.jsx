
import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";

const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { totalOrderAmount, totalOrder, totalReservations, totalRooms } =
    useSelector((store) => store.stat);

  const widgetData = [
    {
      title: "New Booking",
      icon: <MdHotel />,
      color: "#5B5DB4",
      subtitle: `${totalOrder ? "30000" : "30000"}`,
    },
    {
      title: "Total Rooms",
      icon: <MdHotel />,
      color: "#FF7F5C",
      subtitle: `${totalRooms ? "30000" : "30000"}`,
    },
    // {
    //   title: " Total Revenue",
    //   icon: <GiCash />,
    //   color: "#FF7F5C",
    //   subtitle: `$${totalOrderAmount}`,
    // },
    {
      title: "Total Reserved",
      icon: <LuBedDouble />,
      color: "#489BC5",
      subtitle: `${totalReservations ? "30000" : "30000"}`,
    },
    {
      title: "Total Clients",
      icon: <LuBedDouble />,
      color: "#489BC5",
      subtitle: "90",
    },
  ];
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2">
      {widgetData?.map((widget, index) => {
        return (
          <div
            onClick={() => setWidgetTab(index)}
            key={index}
            style={{ transition: "all .3s", gridTemplateColumns: "1fr 50px" }}
            className={`${
              index === 0 ? "bg-[#000] text-[#fff]" : "bg-[#fafafa] text-[#000]"
            } p-6 family1  w-full rounded-[20px] flex-col
               cursor-pointer flex items-start justify-between gap-4 min-h-64`}
          >
            <div className="w-full flex items-center justify-between">
              <div
                className={`w-12 ${
                  index === 0
                    ? "bg-[#fff] text-[#000]"
                    : "bg-[#c5c5c5] text-[#000]"
                } text-2xl h-12 rounded-full flex items-center justify-center`}
              >
                {widget?.icon}
              </div>
              <div
                className={`w-12 ${
                  index === 0
                    ? "border-[rgba(255,255,255,.4)] border text-[#fff]"
                    : "border-[rgba(0,0,0,.4)] border text-[#000]"
                } text-2xl h-12 rounded-full flex items-center justify-center`}
              >
                <MdOutlineArrowOutward />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-5xl font-bold family1">
                {widget?.subtitle}
                <span className="text-grey pb-2 block family1 text-sm font-normal">
                  {widget?.title}
                </span>
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
