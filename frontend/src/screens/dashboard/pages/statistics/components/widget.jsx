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
      bgColor: "#cdeed3",
      color: "#347345",
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
      bgColor: "#deddff",
      color: "#3e3aff",
      subtext:
        "Browse your menu here and check their respective progress..",
      subtitle: `${widgetData?.totalSales ? widgetData?.totalSales : "0"}`,
    },
    {
      title: "Total Menu",
      icon: <IoFastFood />,
      bgColor: "#f3f3f1",
      color: "#a37d18",
      subtext:
        "Browse your menu here and check their respective progress..",
      subtitle: `${widgetData?.totalMenu ? widgetData?.totalMenu : "0"}`,
    },
    {
      title: "Total Ratings",
      icon: <MdReviews />,
      bgColor: "#cdeed3",
      color: "#002b31",
      subtext:
        "Browse your menu here and check their respective progress..",
      subtitle: `${
        totalReview ? totalReview / widgetData?.totalReview?.length : 0
      }`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {widgetDatas?.map((data, index) => {
        return (
          <div
            key={index}
            className="w-full p-4 items-start  justify-center min-h-[200px] md:min-h-[220px] 
                    border rounded-xl flex flex-col gap-4"
          >
            <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
              <div
                style={{
                  backgroundColor: `${data?.bgColor}`,
                  color: `${data?.color}`,
                }}
                className="w-10 md:w-12 text-xl flex items-center justify-center h-10 md:h-12 rounded-md"
              >
                {data?.icon}
              </div>
              <h4 className="text-sm md:text-base family1 font-semibold">
                {data?.title}
              </h4>
            </div>
            <div className="w-full flex flex-col">
              <h3 className="text-2xl md:text-3xl family1 font-semibold ">
                {data?.subtitle}
              </h3>

              <span className="text-xs family1 flex-1 pt-2 block font-normal">
                {data?.subtext}
              </span>
            </div>
            {/* <div className="pt-3">
                    <div className="shadows py-2 bg-[#fafafa] rounded-md cursor-pointer px-4 border text-dark text-sm">Browse</div>
                  </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
