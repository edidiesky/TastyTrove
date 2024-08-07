import { GetPaymentHistory } from "@/features/payment/paymentReducer";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Statistics = () => {
  return (
    <div className="w-full grid lg:grid-cols-custom_1 gap-4">
      <div className="flex w-full">
        <GrowthStat />
      </div>
      <div className="flex w-full">
        <SalesStat />
      </div>
    </div>
  );
};

const GrowthStat = () => {
  const { totalStatAmount, totalMonth } = useSelector((store) => store.stat);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "Work Sans",
      foreColor: "#333",
      fontSize: "30px",
      textTransform: "capitalize",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#EEEEEE", "#000"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Febr",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "sept",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Transactions",
      data: [10, 4, 5, 670, 20, 4, 5, 17, 20],
    },
    {
      name: "Transactions",
      data: [20, 40, 15, 70, 20, 4, 5, 17, 20],
    },
  ]);
  // useEffect(() => {
  //    if (Array.isArray(totalMonth) && Array.isArray([10,4,5,670,20,4,5,17,20])) {
  //      if (totalMonth.length !== 0 || totalStatAmount.length !== 0) {
  //        setOptions((prevOptions) => ({
  //          ...prevOptions,
  //          xaxis: {
  //            categories: totalMonth,
  //          },
  //        }));
  //        setSeries([
  //          {
  //            name: "Transactions",
  //            data: totalStatAmount,
  //          },
  //        ]);
  //      }
  //    }
  // }, [totalStatAmount, totalMonth, setSeries, setOptions]);
  return (
    <div id="chart" className="w-full h-full">
      <div className="w-full flex flex-col h-full gap-8">
        <div className="bg-[#fafafa] w-full px-6 py-8 md:py-12 flex-col rounded-[10px] min-h-[430px] md:min-h-[600px] flex gap-4">
          <h3 className="text-3xl font-semibold family1">Sales Statistics</h3>
          <div className="flex h-full w-full flex-col gap-8">
            <Chart
              options={options}
              series={series}
              type="bar"
              width={"100%"}
              height={'100%'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesStat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPaymentHistory());
  }, []);
  const { payments } = useSelector((store) => store.payment);
  const { menus } = useSelector((store) => store.menu);
  // console.log(menus);
  return (
    <div className="w-full lg:w-[30vw] flex flex-col gap-4 ">
      <div className="w-full flex flex-col  py-8 bg-[#fafafa] rounded-[10px] gap-4">
        <div className="w-full px-6 flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-semibold family1">
            Recent Sales
          </h3>
          <Link
            style={{ textDecoration: "underline" }}
            className="text-sm text-[var(--dark-1)] family1"
            to={"/dashboard/orders"}
          >
            View All
          </Link>
        </div>
        <ul className="flex flex-col w-full">
          {/* {payments?.slice(0, 3)?.map((data, index) => {
            return (
              <li
                key={index}
                className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] family1 flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#000] flex items-center justify-center text-white text-base">
                    {data?.user?.name[0]}
                  </div>
                  <span className="text-base family1 font-semibold">
                    {data?.user?.name}
                    <div className="block family1 font-normal text-xs text-grey">
                      {data?.user?.email}
                    </div>
                  </span>
                </div>
                <span>+${Number(data?.amount).toLocaleString()}</span>
              </li>
            );
          })} */}
          {menus?.slice(0, 2)?.map((data, index) => {
            return (
              <li
                key={index}
                className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] family1 flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4">
                  <img src={data?.image} className="w-12  object-cover" />
                  <span className="text-base family1 font-semibold">
                    {data?.title}
                    <div className="block family1 font-normal text-xs text-grey">
                      {data?.category}
                    </div>
                  </span>
                </div>
                <span>+$40</span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* top selling product */}
      <div className="w-full flex bg-[#fafafa]  py-8 rounded-[10px] flex-col gap-4">
        <div className="w-full px-6 flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-semibold family1">
            Top Selling Product
          </h3>
        </div>
        <ul className="flex flex-col w-full">
          {menus?.slice(0, 3)?.map((data, index) => {
            return (
              <li
                key={index}
                className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] family1 flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4">
                  <img src={data?.image} className="w-12  object-cover" />
                  <span className="text-base family1 font-semibold">
                    {data?.title}
                    <div className="block family1 font-normal text-xs text-grey">
                      {data?.category}
                    </div>
                  </span>
                </div>
                <span>+$40</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
