
import React, { useState } from "react";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { handlePage } from "@/features/menu/menuSlice";
import moment from "moment";
import { BsFillStarFill } from "react-icons/bs";
const Reviews = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const { reviews, review, createMenuReviewisLoading } = useSelector(
    (store) => store.review
  );
  return (
    <div className="w-full bg-[#fff] py-6 md:py-12 md:px-8 rounded-[20px]">
      <div className="w-full md:w-[500px] mx-auto grid lg:grid-cols-1 gap-y-12 gap-x-8">
        {reviews?.map((review, index) => {
          return (
            <div key={index} className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                {review?.user?.image ? (
                  <img
                    src={review?.user?.image}
                    alt=""
                    className="w-12 lg:w-16 h-12 lg:h-16 rounded-full"
                  />
                ) : (
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-12 lg:w-16 h-12 lg:h-16 rounded-full"
                  />
                )}
                <h4 className=" text-base md:text-base family1 font-bold">
                  {review?.user?.name}
                  <span className="flex items-center gap-3">
                    <span className="block font-normal text-xs md:text-sm">
                      {moment(review?.createdAt).format("DD MMM YYYY")}
                    </span>
                    <span className="flex text-xs items-center">
                      {Array(review?.review)
                        .fill("")
                        .map((x, index) => {
                          return (
                            <span key={index} className="">
                              <BsFillStarFill />
                            </span>
                          );
                        })}
                    </span>
                  </span>
                </h4>
              </div>
              <div className="w-full flex items-start flex-col gap-2">
                <span className="flex max-w-[400px] text-sm md:text-sm family1 font-normal items-center">
                  {review?.description}
                </span>
                <span className="flex text-sm family1 font-normal items-center gap-2">
                  <span>
                    {" "}
                    <span className="text-sm md:text-base font-bold">{review?.user?.name}</span>{" "}
                    reviewed{" "}
                  </span>
                  <span className="font-bold">{review?.menu?.title}</span> Menu
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
