"use client";
import React, { useState, useEffect } from "react";
import RoomForms from "./roomsform";
import RoomDetail from "./roomdetail";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateMenu,
  getSingleMenu,
  UpdateMenu,
} from "@/features/menu/menureducer";
import Loader from "@/components/home/loader";
import { useNavigate, useParams } from "react-router-dom";
import { handleClearMenuAlert } from "@/features/menu/menuSlice";
const DashboardIndex = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [images, setImages] = useState([]);

  const [features, setFeatures] = useState([]);
  const [menus, setMenus] = useState(0);
  const [bathrooms, setBathRooms] = useState(0);
  const [description, setDescription] = useState("");
  const [shortdescription, setShortDescription] = useState("");

  const dispatch = useDispatch();
  const {
    creatingMenuisLoading,
    updateMenuisSuccess,
    creatingMenuisSuccess,
    updateMenuisLoading,
    menu,
  } = useSelector((store) => store.menu);
  // get the menu id
  const { id } = useParams();

  useEffect(() => {
     dispatch(handleClearMenuAlert());
    if (id) {
      dispatch(getSingleMenu(id));
    }
  }, [id]);

  useEffect(() => {
    if (menu) {
      setTitle(menu?.title);
      setPrice(menu?.price);
      setAvailability(menu?.availabilityCount);
      setDescription(menu?.description);
      setImages(menu?.images);
      setBathRooms(menu?.bathroom);
      setMenus(menu?.bedroom);
      // dispatch(getSingleMenu(menu));
    } else {
       setTitle("");
       setPrice("");
       setAvailability("");
       setDescription("");
       setImages([]);
       setBathRooms("");
       setMenus("");
    }
  }, [
    menu,
    setTitle,
    setMenus,
    setPrice,
    setDescription,
    setImages,
    setBathRooms,
  ]);
  //  const [bookingdata, setBookingData] = useState(null);
  const roomData = {
    title: title,
    price: price.toString(),
    images: images,
    availability: availability,
    features: features,
    description: description,
  };
  // console.log(roomData);
  const handleRoomCreation = () => {
    if (menu) {
      dispatch(
        UpdateMenu({
          ...roomData,
        })
      );
    } else {
      dispatch(CreateMenu(roomData));
    }
  };

  useEffect(() => {
   
    if (creatingMenuisSuccess) {
      const timeout = setTimeout(() => {
        navigate(`/dashboard/menu`);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [creatingMenuisSuccess, navigate]);

  return (
    <div className="w-full relative">
      <div className="w-full relative pb-20 flex flex-col gap-12">
        <div className="w-full grid md:grid-cols-2 md:items-center justify-between">
          <h3 className="text-4xl lg:text-5xl family1 font-bold">
            {menu ? "Update Your menu" : <>Create <br /> Your Menu</>}
            <span className="block font-normal text-dark pt-2 text-base family1">
              When adding your menu product idea, do
              not forget to fill out the forms else errors are bound to occur
            </span>
          </h3>
          <div className="flex items-center md:justify-end">
            <button
              disabled={creatingMenuisLoading || updateMenuisLoading}
              onClick={handleRoomCreation}
              className="btn btn-4 text-base family1 p-3  px-8 text-white rounded-[40px]"
            >
              {creatingMenuisLoading || updateMenuisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  {menu ? " Updating in progress" : "Room Creating"}
                </span>
              ) : (
                <>{menu ? "Update Room" : "Create Room"}</>
              )}
            </button>
          </div>
        </div>
        <div className="w-full relative flex gap-8 flex-col-reverse lg:grid items-start lg:grid-cols-1">
          <RoomForms
            description={description}
            setTitle={setTitle}
            title={title}
            setDescription={setDescription}
            setShortDescription={setShortDescription}
            shortdescription={shortdescription}
            setPrice={setPrice}
            price={price}
            menu={menus}
            setMenus={setMenus}
            setBathRooms={setBathRooms}
            bathrooms={bathrooms}
            setImages={setImages}
            images={images}
            features={features}
            setFeatures={setFeatures}
            availability={availability}
            setAvailability={setAvailability}
          />
          {/* <div className="w-full md:w-[350px] relative lg:sticky top-[15%] left-0">
            <RoomDetail
              images={images}
              title={title}
              price={price}
              menu={menus}
              bathrooms={bathrooms}
              shortdescription={shortdescription}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
