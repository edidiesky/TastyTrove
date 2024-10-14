import { GetPaymentHistory } from "@/features/payment/paymentReducer";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductBreakdown from "./ProductBreakdown";

const Statistics = () => {
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex w-full">
        <MonthlyRevenue />
      </div>
      {/* <SalesStat /> */}
    </div>
  );
};

const MonthlyRevenue = () => {
  const { totalMonthSalesAmount, totalMonth, totalMonthRevenue } = useSelector(
    (store) => store.stat
  );
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "Karla",
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
    colors: ["#2E0266", "var(--primary)"],
    xaxis: {
      categories: totalMonth,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Revenue",
      data: totalMonthRevenue,
    },
  ]);
  useEffect(() => {
    if (
      Array.isArray(totalMonth) &&
      Array.isArray(totalMonthRevenue) &&
      Array.isArray(totalMonthSalesAmount)
    ) {
      if (
        totalMonth.length !== 0 ||
        totalMonthSalesAmount.length !== 0 ||
        totalMonthRevenue.length !== 0
      ) {
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: totalMonth,
          },
        }));
        setSeries([
          {
            name: "Revenue",
            data: totalMonthRevenue,
          },
          // {
          //   name: "Sales",
          //   data: totalMonthSalesAmount,
          // },
        ]);
      }
    }
  }, [totalMonthSalesAmount, totalMonthRevenue, totalMonth]);

  return (
    <div className="py-8 border rounded-lg flex flex-col w-full gap-6">
      <h3 className="text-xl px-4 block lg:text-2xl text-dark family6">
        Growth Analysis
      </h3>
      <div className="flex h-full w-full flex-col gap-8">
        <Chart
          options={options}
          series={series}
          type="bar"
          width={"100%"}
          height={"250px"}
        />
      </div>
    </div>
  );
};

const MonthlySales = () => {
  const { totalMonthSalesAmount, totalMonth, totalMonthRevenue } = useSelector(
    (store) => store.stat
  );
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
    colors: ["#000", "var(--primary)"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: totalMonth,
      // categories: [
      //   "Jan",
      //   "Febr",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "sept",
      // ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: totalMonthSalesAmount,
    },
  ]);
  useEffect(() => {
    if (Array.isArray(totalMonth) && Array.isArray(totalMonthSalesAmount)) {
      if (totalMonth.length !== 0 || totalMonthSalesAmount.length !== 0) {
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: totalMonth,
          },
        }));
        setSeries([
          {
            name: "Sales",
            data: totalMonthSalesAmount,
          },
        ]);
      }
    }
  }, [totalMonthSalesAmount, totalMonth]);

  return (
    <div id="chart" className="w-full h-full">
      <div className="w-full flex flex-col h-full gap-8">
        <div className="bg-[#fafafa] w-full px-6 py-8 md:py-12 flex-col rounded-[10px] min-h-[430px] flex gap-4">
          <h3 className="text-3xl font-semibold family1">Sales Count</h3>
          <div className="flex h-full w-full flex-col gap-8">
            <Chart
              options={options}
              series={series}
              type="bar"
              width={"100%"}
              height={"350px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesStat = () => {
  const { recentSales, topSaledProduct } = useSelector((store) => store.stat);
  return (
    <div className="w-full">
      <div className="w-full grid md:grid-cols-custom_2 items-start gap-4 ">
        {/* top selling product */}
        <div className="w-full md:w-[350px] flex flex-col  py-8 bg-[#fafafa] rounded-[10px] gap-4">
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
            {recentSales?.length === 0 ? (
              <span className="text-sm">
                {" "}
                <span className="block px-6 text-sm font-normal">
                  You have no recent sales
                </span>
              </span>
            ) : (
              <>
                {recentSales?.slice(0, 3)?.map((data, index) => {
                  return (
                    <li
                      key={index}
                      className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] family1 flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={data?.cartItems[0]?.menu?.image}
                          className="w-20 object-cover"
                        />

                        <span className="text-base family1 font-semibold">
                          {data?.cartItems[0]?.menu?.title}
                          <div className="block family1 font-normal text-xs text-grey">
                            {moment(data?.createdAt).format("DD MMM YYYY")}
                          </div>
                        </span>
                      </div>
                      <span>₦{data?.amount}</span>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </div>
        <div className="w-full">
          <MonthlySales />
        </div>
        {/* <div className="w-full flex bg-[#fafafa]  py-8 rounded-[10px] flex-col gap-4">
        <div className="w-full px-6 flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-semibold family1">
            Top Selling Product
          </h3>
        </div>
        <ul className="flex flex-col w-full">
          {topSaledProduct?.length === 0 ? (
            <span>
              <span className="block px-6 text-sm font-normal">
                You have not sold any product
              </span>
            </span>
          ) : (
            <>
              {topSaledProduct?.slice(0, 3)?.map((data, index) => {
                return (
                  <li
                    key={index}
                    className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] family1 flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-4">
                      <img src={data?.image} className="w-20  object-cover" />
                      <span className="text-base family1 font-semibold">
                        {data?.title}
                        <div className="block family1 font-normal text-xs text-grey">
                          {data?.category}
                        </div>
                      </span>
                    </div>
                    <span>{data?.servedCount} Qty</span>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div> */}
      </div>
    </div>
  );
};

export default Statistics;
