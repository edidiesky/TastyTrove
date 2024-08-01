import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import Button from "../common/Button";
export default function Reviews() {
  const reviewTab = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
  ];
  const [tab, setTab] = useState(null);
  return (
    <div className="w-full flex flex-col gap-8">
      <h3
        className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] 
          after:rounded-lg after:absolute text-5xl uppercase text-light text-dark"
      >
        Product Review
      </h3>
      <div className="w-full flex flex-col gap-8">
        <h4 className="family1 text-base text-dark">
          Your email address will not be published. Required fields are marked *
        </h4>
        <div className="w-full flex items-center flex-wrap gap-4">
          {reviewTab.map((data, index) => {
            return (
              <span
                onClick={() => setTab(data?.value)}
                key={index}
                className={`p-3 ${
                  tab === data?.value ? "bg-[#eceece]" : ""
                } flex-1 family1 min-w-[200px] rounded-[5px] cursor-pointer font-bold bg-[#F9F9F9] px-4 flex items-center justify-between`}
              >
                {data.value}
                <span className="flex text-[#777] items-center text-xs">
                  {Array(data?.value)
                    .fill("")
                    .map((x, index) => {
                      return (
                        <span key={index}>
                          <BsFillStarFill />
                        </span>
                      );
                    })}
                </span>
              </span>
            );
          })}
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <label
              htmlFor="review"
              className="flex w-full flex-col gap-2 text-base family1 font-normal"
            >
              Your Review
              <textarea
                name=""
                id=""
                className="w-full p-8 text-[#777] h-[100px]"
              ></textarea>
            </label>
            <label
              htmlFor="Name"
              className="flex w-full flex-col gap-2 text-base family1 font-normal"
            >
              Name
              <input
                name=""
                id="Name"
                className="w-full p-8 text-[#777]"
              ></input>
            </label>
            <label
              htmlFor="Email"
              className="flex w-full flex-col gap-2 text-base family1 font-normal"
            >
              Email
              <input
                name=""
                id="Email"
                className="w-full p-8 text-[#777]"
              ></input>
            </label>
          </div>
          <button className="h-[55px] w-[200px] text-sm">
            <Button
              text={`Submit Review`}
              bgColor={"#fff"}
              type={"full_dark"}
            ></Button>
          </button>
        </div>
      </div>
    </div>
  );
}
