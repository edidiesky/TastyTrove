import React, { useEffect, useState } from "react";
import moment from "moment";
import { BsFillStarFill } from "react-icons/bs";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { CreateReview, GetMenuReviews } from "@/features/review/reviewReducer";
import { ReviewInputData } from "@/constants/data/formdata";
import { onLoginModal } from "@/features/modals/modalSlice";
import Loader from "../loader";
export default function Reviews() {
  const [showreview, setShowReview] = useState(false);
  const { menu } = useSelector((store) => store.menu);
  const { currentUser } = useSelector((store) => store.auth);
  const { reviews, review, createMenuReviewisLoading } = useSelector(
    (store) => store.review
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser && menu?.id) {
      dispatch(GetMenuReviews(menu?.id));
    }
  }, [review]);
  // console.log(menu);
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
  const [formdata, setFormData] = useState({
    description: "",
    name: "",
    email: "",
  });
  // console.log(formdata);
  const reviewData = {
    description: formdata?.description,
    menuid: menu?.id,
    sellerId: menu?.user?.id,
    review: tab,
  };
  const handleFormChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        email: currentUser?.email,
        name: currentUser?.name,
      });
    }
  }, [currentUser, setFormData]);

  return (
    <div data-testid="review_component" className="w-full flex flex-col gap-12">
      <div className="w-full flex flex-col md:w-[50%] max-w-custom gap-8">
        <h3
          data-test="Review_header"
          className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] 
          after:rounded-lg after:absolute text-5xl uppercase text-light text-dark"
        >
          Leave a Review
        </h3>
        <div className="w-full flex flex-col gap-8">
          <h4 className="family1 text-base text-dark">
            Your email address will not be published. Required fields are marked
            *
          </h4>
          <div className="w-full flex items-center flex-wrap gap-4">
            {reviewTab.map((data, index) => {
              return (
                <span
                  data-test={`review_tab_${data?.value}`}
                  onClick={() => setTab(data?.value)}
                  key={index}
                  className={`p-3 ${
                    tab === data?.value ? "bg-[#eceece]" : ""
                  } flex-1 family1 min-w-[120px] rounded-[5px] cursor-pointer font-bold bg-[#F9F9F9] px-4 flex items-center justify-between`}
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
          <form className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-4">
              {ReviewInputData?.map((input, index) => {
                return (
                  <div key={index} className="w-full">
                    {input?.inputtype === "textarea" ? (
                      <label
                        htmlFor={input.label}
                        className="flex w-full flex-col gap-2 text-sm family1 font-normal"
                      >
                        {input.label}
                        <textarea
                          name={input?.name}
                          data-test={`${input?.name}`}
                          id={input.label}
                          value={formdata[input.name]}
                          type={input.type}
                          onChange={handleFormChange}
                          className="w-full rounded-lg p-4 border text-[#777] h-[100px]"
                        ></textarea>
                      </label>
                    ) : (
                      <label
                        htmlFor={input.label}
                        className="flex w-full flex-col gap-2 text-sm family1 font-normal"
                      >
                        {input.label}
                        <input
                          data-test={`${input?.name}`}
                          name={input?.name}
                          id={input.label}
                          value={formdata[input.name]}
                          type={input.type}
                          onChange={handleFormChange}
                          className="w-full input p-4 text-[#777]"
                        ></input>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              data-test="review_button"
              onClick={(e) => {
                e.preventDefault();
                if (currentUser) {
                  dispatch(CreateReview(reviewData));
                  setFormData({
                    description: "",
                    name: "",
                    email: "",
                  });
                  setTab(null);
                } else {
                  dispatch(onLoginModal());
                }
              }}
              disabled={
                createMenuReviewisLoading ||
                tab === null ||
                formdata?.description === ""
              }
              type="submit"
              className={`h-[55px] w-[200px] text-sm`}
            >
              <Button
                disabled={
                  createMenuReviewisLoading ||
                  tab === null ||
                  formdata?.description === ""
                }
                text={
                  createMenuReviewisLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Loader color={"#fff"} type={"dots"} />
                      Review in Progress
                    </div>
                  ) : (
                    `Submit Review`
                  )
                }
                bgColor={"var(--primary)"}
                type={"dark"}
              ></Button>
            </button>
          </form>
        </div>
      </div>
      {/* reviews on the product */}
      {reviews?.length !== 0 && (
        <div
          data-test="review_list_container"
          className="w-full flex flex-col gap-8"
        >
          <h3
            className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] 
          after:rounded-lg after:absolute text-4xl uppercase text-light text-dark"
          >
            {menu?.title}'s Reviews
          </h3>
          <div className="w-full flex flex-col gap-8">
            <h4 className="family1 text-base text-dark">
              Your email address will not be published. Required fields are
              marked *
            </h4>
            <div
              data-test={`review_list_content`}
              className="w-full grid lg:grid-cols-1 gap-8"
            >
              {reviews?.map((review, index) => {
                return (
                  <div
                    data-test={`review_list_item_${index}`}
                    key={index}
                    className="w-full flex max-w-[700px] pb-6 border-b flex-col gap-4"
                  >
                    <div className="w-full flex items-start gap-4">
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
                      <div className="flex flex-col gap-4">
                        <h4 className="text-lg family1 font-semibold">
                          {review?.user?.name}
                          <span className="flex items-center gap-3">
                            <span className="block font-normal text-xs">
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
                        <div className="w-full gap-2">
                          <span className="flex text-sm family1 font-normal items-center">
                            {review?.description?.length > 200 ? (
                              <>
                                {showreview
                                  ? review?.description
                                  : `${review?.description?.slice(0, 200)} ...`}
                              </>
                            ) : (
                              <>{review?.description}</>
                            )}
                          </span>
                          {review?.description?.length > 200 && (
                            <span
                              onClick={() => setShowReview(!showreview)}
                              className="text-sm cursor-pointer family1 font-bold underline"
                            >
                              {showreview ? "Read Less" : "Read More"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
