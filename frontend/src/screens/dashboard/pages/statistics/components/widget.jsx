
import React, { useState } from "react";
import { MdReviews } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { totalOrderAmount, totalOrder, totalReservations, totalRooms } =
    useSelector((store) => store.stat);

  const widgetData = [
    {
      title: "Total Sales",
      icon: <IoFastFood />,
      color: "#5B5DB4",
      subtitle: `${totalOrder ? "10" : "10"}`,
    },
    {
      title: "Total Menu",
      icon: <IoFastFood />,
      color: "#FF7F5C",
      subtitle: `${totalRooms ? "10" : "10"}`,
    },
    {
      title: "Total Ratings",
      icon: <MdReviews />,
      color: "#489BC5",
      subtitle: `${totalReservations ? "5" : "5"}`,
    },
    {
      title: "Total Clients",
      icon: <FaRegUser />,
      color: "#489BC5",
      subtitle: "4",
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
      {widgetData?.map((widget, index) => {
        return (
          <div
            onClick={() => setWidgetTab(index)}
            key={index}
            style={{ transition: "all .3s", gridTemplateColumns: "1fr 50px" }}
            className={`${
              index === 0 ? "bg-[#000] text-[#fff]" : "bg-[#fafafa] text-[#000]"
            } p-6 family1  w-full rounded-[20px] flex-col
               cursor-pointer flex items-start justify-between gap-4 min-h-48 md:min-h-56`}
          >
            <div className="w-full flex items-center justify-between">
              <div
                className={`w-10 md:w-12 ${
                  index === 0
                    ? "bg-[#fff] text-[#000]"
                    : "bg-[#ebebeb] text-[#000]"
                } text-lg md:text-xl h-10 md:h-12 rounded-full flex items-center justify-center`}
              >
                {widget?.icon}
              </div>
              <div
                className={`w-10 md:w-12 ${
                  index === 0
                    ? "border-[rgba(255,255,255,.4)] border text-[#fff]"
                    : "border-[rgba(0,0,0,.4)] border text-[#000]"
                } text-lg md:text-2xl h-10 md:h-12 rounded-full flex items-center justify-center`}
              >
                <MdOutlineArrowOutward />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-5xl font-semibold family1">
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
