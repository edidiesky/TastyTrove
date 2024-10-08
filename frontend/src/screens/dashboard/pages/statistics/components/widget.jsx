import React, { useState } from "react";
import { MdReviews } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegUser, FaMoneyBill } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { widgetData } = useSelector((store) => store.stat);
  const totalReview = widgetData?.totalReview?.reduce((acc, total) => {
    acc += total?.review;
    return acc;
  }, 0);

  const widgetDatas = [
    {
      title: "Total Revenue",
      icon: <FaMoneyBill />,
      color: "#FD9D2A",
      subtitle: `₦${
        widgetData?.totalRevenue
          ? widgetData?.totalRevenue >= 1000
            ? (widgetData.totalRevenue / 1000).toFixed(1) + "K"
            : widgetData?.totalRevenue >= 1000000
            ? (widgetData.totalRevenue / 1000000).toFixed(1) + "M"
            : Number(widgetData.totalRevenue).toLocaleString()
          : "0"
      }`,
    },
    {
      title: "Total Sales",
      icon: <IoFastFood />,
      color: "#8F0EBE",
      subtitle: `${widgetData?.totalSales ? widgetData?.totalSales : "0"}`,
    },
    {
      title: "Total Menu",
      icon: <IoFastFood />,
      color: "#8bca41",
      subtitle: `${widgetData?.totalMenu ? widgetData?.totalMenu : "0"}`,
    },
    {
      title: "Total Ratings",
      icon: <MdReviews />,
      color: "#8F0EBE",
      subtitle: `${
        totalReview ? totalReview / widgetData?.totalReview?.length : 0
      }`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {widgetDatas?.map((widget, index) => {
        return (
          <div
            onClick={() => setWidgetTab(index)}
            key={index}
            style={{
              backgroundColor: `#fafafa`,
              transition: "all .3s",
              gridTemplateColumns: "1fr 50px",
            }}
            className={`${
              index === 0 ? "bg-[#000] text-[#000]" : "bg-[#eee] text-[#000]"
            } p-6 family1  w-full rounded-[20px] flex-col
               cursor-pointer flex items-start justify-between shadow-sm gap-4 min-h-48 md:min-h-56`}
          >
            <div className="w-full flex items-center justify-between">
              <div
                className={`w-10 md:w-12 ${
                  index === 0
                    ? "bg-[#fff] text-[#000]"
                    : "bg-[#fff] text-[#000]"
                } text-base md:text-lg h-10 md:h-12 rounded-full flex items-center justify-center`}
              >
                {widget?.icon}
              </div>
              <div
                className={`w-10 md:w-12 ${
                  index === 0
                    ? "border-[rgba(255,255,255,.4)] border text-[#000]"
                    : "border-[rgba(0,0,0,.4)] border text-[#000]"
                } text-base md:text-lg h-10 md:h-12 rounded-full flex items-center justify-center`}
              >
                <MdOutlineArrowOutward />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-3xl md:text-4xl font-semibold family1">
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
