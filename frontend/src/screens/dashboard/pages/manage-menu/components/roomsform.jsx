import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./imageUpload";
import Roomfeatures from "./roomfeatures";

const RoomForms = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  setImages,
  images,
  setFeatures,
  features,
  availability,
  setAvailability,
}) => {
  const handleFeatureSelection = (data) => {
    if (features.includes(data)) {
      const newdata = features.filter((x) => x?.title !== data?.title);
      setFeatures(newdata);
    } else {
      setFeatures([...features, data]);
    }
  };
  const module = {
    toolbar: [["bold", "italic"], ["link"]],
  };
  return (
    <div className="w-full grid lg:grid-cols-custom_1 items-start gap-8">
      <div className="w-full flex bg-[#fdfdfd] border rounded-[20px] py-8  px-4 flex-col gap-8">
        <div className="w-full flex flex-col gap-4">
          {/* title */}
          <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-4">
            <div className="w-full grid grid-cols-2 items-center justify-between">
              <h4 className="text-xl font-bold">Name & Description</h4>
              <div className="flex items-center justify-end">
                <Link
                  to={"/dashboard/menu"}
                  className="p-2 md:px-4 cursor-pointer hover:bg-[#fafafa] 
                  border border-[rgba(0,0,0,.3)] rounded-[40px] family1 text-xs md:text-sm flex items-center justify-center gap-2"
                >
                  Go Back
                </Link>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <label
                htmlFor="title"
                className="text-sm  flex flex-col gap-2 family1"
              >
                Menu Title
                <input
                  name="title"
                  value={title}
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm w-full input"
                />
              </label>
              <label
                htmlFor="description"
                className="text-sm h-[300px] flex flex-col gap-2 family1"
              >
                Menu Description
                {/* <textarea
                name="description"
                value={description}
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="text-sm w-full h-[250px]"
              /> */}
                <ReactQuill
                  // modules={module}
                  theme="snow"
                  style={{
                    height: "150px",
                    borderRadius: "15px",
                    fontFamily: "Work Sans",
                  }}
                  value={description}
                  onChange={setDescription}
                />
              </label>
            </div>
          </div>
          {/* price */}
          <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-lg md:text-xl font-bold family1">
                Menu Price
                <span className="font-normal family1 text-sm block">
                  Share what makes your menu special.
                </span>
              </h4>
            </div>
            <div className="w-full flex flex-col gap-4">
              <label
                htmlFor="titlprice"
                className="text-sm  flex flex-col gap-2 family1"
              >
                Menu Amount
                <input
                  name="price"
                  value={price}
                  id="price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-sm w-full input"
                />
              </label>

              <div className="pt-2 w-full flex flex-col gap-4">
                <div className="w-full grid md:grid-cols-1 gap-4">
                  <label
                    htmlFor="availability"
                    className="text-sm  flex flex-col gap-2 family1"
                  >
                    Menu Availability
                    <input
                      name="availability"
                      value={availability}
                      id="availability"
                      type="text"
                      onChange={(e) => setAvailability(e.target.value)}
                      className="text-sm w-full input"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageUpload
        setFeatures={setFeatures}
        features={features}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default RoomForms;
