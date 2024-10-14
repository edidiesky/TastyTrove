import React, { useEffect, useState } from "react";
import Reviews from "./orderlist";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  CreateReview,
  GetReviewHistoryForAdmin,
} from "@/features/review/reviewReducer";
import Button from "@/components/common/Button";
import Loader from "@/components/loader";
// GetReviewHistoryForAdmin
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();
  const { reviews, review, getMenuReviewisLoading } = useSelector(
    (store) => store.review
  );
  useEffect(() => {
    dispatch(GetReviewHistoryForAdmin());
  }, []);
  if (getMenuReviewisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <h3 className="text-3xl block lg:text-4xl family6">
            A summary of your product Reviews
            <span className="block pt-3 family1 text-sm font-normal">
              This provides you a summary of all the menu reviewed by users
            </span>
          </h3>
        </div>
        {reviews?.length === 0 ? (
          <div className="w-full pt-6 flex  items-center justify-center flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-dark family1">
              Review is empty
            </h2>
            <Link
              to={"/dashboard/menu"}
              className="h-[50px] w-[200px] text-base"
            >
              <Button text={"Browse your Menu"} type={"dark"} />
            </Link>
          </div>
        ) : (
          <Reviews />
        )}
      </div>
    </div>
  );
};

export default DashboardIndex;
