
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./imageUpload";
import Roomfeatures from "./roomfeatures";

const RoomForms = ({
  title,
  setMenu,
  menu,
  setBathRooms,
  bathrooms,
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
        <div className="w-full flex flex-col gap-8">
          {/* title */}
          <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-2xl family1 font-semibold">
                Name & Description
              </h4>
              <div className="flex items-center justify-end">
                <Link
                  to={"/dashboard/menu"}
                  className="p-2 px-4 cursor-pointer hover:bg-[#fafafa] border border-[rgba(0,0,0,.3)] rounded-[40px] family1 text-sm flex items-center justify-center gap-2"
                >
                  Go Back
                </Link>
              </div>
            </div>
            <div className="pt-4 w-full flex flex-col gap-4">
              <label
                htmlFor="title"
                className="text-sm  flex flex-col gap-2 family1"
              >
                Product Title
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
                Product Description
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
                    height: "200px",
                    borderRadius: "15px",
                  }}
                  value={description}
                  onChange={setDescription}
                />
              </label>
            </div>
          </div>
          {/* price */}
          <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-2xl family1">
                Menu Price
                <span className="font-normal font-booking_font text-base block">
                  Share what makes your menu special.
                </span>
              </h4>
            </div>
            <div className="pt-2 w-full flex flex-col gap-4">
              <label
                htmlFor="titlprice"
                className="text-sm  flex flex-col gap-2 family1"
              >
                Menu Amount
                <input
                  name="price"
                  value={price}
                  id="price"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-sm w-full input"
                />
              </label>
              <div className="w-full grid md:grid-cols-2 gap-4">
                <label
                  htmlFor="menu"
                  className="text-sm  flex flex-col gap-2 family1"
                >
                  Menu Count
                  <input
                    name="menu"
                    value={menu}
                    id="menu"
                    type="number"
                    onChange={(e) => setMenu(parseFloat(e.target.value))}
                    className="text-sm w-full input"
                  />
                </label>
                <label
                  htmlFor="bathrooms"
                  className="text-sm  flex flex-col gap-2 family1"
                >
                  Bath-Menu Count
                  <input
                    name="bathrooms"
                    value={bathrooms}
                    id="bathrooms"
                    type="number"
                    onChange={(e) => setBathRooms(parseFloat(e.target.value))}
                    className="text-sm w-full input"
                  />
                </label>
              </div>
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
        {/* Menu Attributes and Features
      <Roomfeatures
        features={features}
        handleFeatureSelection={handleFeatureSelection}
      /> */}
      </div>
      <ImageUpload images={images} setImages={setImages} />
    </div>
  );
};

export default RoomForms;
