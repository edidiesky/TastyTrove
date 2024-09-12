import React, { useState } from "react";
import Chart from "react-apexcharts";
const ProductBreakdown = () => {
  const [options, setOptions] = useState({
    series: [4, 15, 7, 8],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        fontFamily: "Work Sans",
        foreColor: "#333",
        fontSize: "30px",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total Menu",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },
      labels: ["Main Course", "DRINK & COCKTAIL", "Hors d’oeuvres", "desserts"],
    },
  });

  const menuLabels = [
    {
      title: "Main Course",
      color: "#249DF9",
    },
    {
      title: "DRINK & COCKTAIL",
      color: "#24E5A3",
    },
    {
      title: "Hors d’oeuvres",
      color: "#FCB939",
    },
    {
      title: "desserts",
      color: "#FD5E75",
    },
  ];
  return (
    <div className="w-full flex flex-col  py-8 bg-[#fafafa] rounded-[10px] gap-4">
      <div className="w-full px-6 flex items-center justify-between">
        <h3 className="text-2xl lg:text-3xl font-semibold family1">
          Food Breakdown
        </h3>
      </div>

      <div className="flex h-full w-full flex-col gap-1">
        <Chart
          options={options.options}
          series={options?.series}
          type="radialBar"
          width={"100%"}
          height={"400px"}
        />
        <div className="w-full px-4 flex items-center justify-center flex-wrap gap-3">
          {menuLabels?.map((label, index) => {
            return (
              <span
                key={index}
                className="flex items-center gap-3 text-sm family1"
              >
                {label?.title}
                <div
                  style={{
                    background: `${label?.color}`,
                  }}
                  className="w-2 h-2 rounded-full"
                ></div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductBreakdown;
