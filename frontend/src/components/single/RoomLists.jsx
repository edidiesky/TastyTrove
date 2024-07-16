"use client";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import RoomGallery from "./RoomGallery";
import RoomTitleAndDescription from "./RoomTitleAndDescription";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import RoomFeatures from "./RoomFeatures";
import RoomPaymentTab from "./RoomPaymentTab";
const RoomLists = () => {
  const [datemodal, setDateModal] = useState(false);
  const [guestsmodal, setGuestsModal] = useState(false);
  const [loginmodal, setLoginModal] = useState(false);
  const [registermodal, setRegisterModal] = useState(false);

  const [childrens, setChildrens] = useState(1);
  const [adults, setAdults] = useState(2);

  const { room, getallRoomisLoading } = useSelector((store) => store.room);

  const handleImagePosition = (position) => {
    if (position === "left") {
      setTabIndex(tabindex < 0 ? room?.images?.length - 1 : tabindex - 1);
    }
    if (position === "right") {
      setTabIndex(tabindex >= room?.images?.length ? 0 : tabindex + 1);
    }
  };

  return (
    <>
      <div
        className="w-full relative py-12 md:py-24 border-b flex items-center justify-center
   gap-8"
      >
        <div
          className="w-[90%] relative mx-auto max-w-custom_1 z-40 flex flex-col-reverse lg:grid lg:grid-cols-custom items-start justify-center
       gap-12"
        >
          <div className="w-full">
            <div className="flex flex-col gap-6 w-full">
              {/* room title */}
              <h3 className="text-5xl font-booking_font4 font-normal">
                {room?.title}

                <span className="text-base text-dark font-normal font-booking_font_bold flex items-center gap-3">
                  Room, London{" "}
                  <span className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>
                </span>
              </h3>
              {/* room image */}
              <RoomGallery room={room} />
              {/* room basic features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:items-center gap-8">
                <div className="flex flex-col items-center justify-center gap-1 text-sm font-booking_font4 text-dark">
                  <img
                    src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/plugins/nd-booking/templates/icon-bed-grey.svg"
                    alt=""
                    className="w-12"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-base">
                      {" "}
                      ₦ {Number(room?.price).toLocaleString()}{" "}
                    </span>
                    <span className="font-booking_font text-xs">
                      {" "}
                      / PER NIGHT
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-sm font-booking_font4 text-dark">
                  <img
                    src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/plugins/nd-booking/templates/icon-user-grey.svg"
                    alt=""
                    className="w-10"
                  />
                  {room?.guests} GUESTS
                </div>

                <div className="flex flex-col items-center justify-center gap-2 uppercase text-sm font-booking_font4 text-dark">
                  <img
                    src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/television.png"
                    alt=""
                    className="w-10"
                  />
                  PS5 Console
                </div>

                <div className="flex flex-col items-center justify-center uppercase gap-1 text-sm font-booking_font4 text-dark">
                  <img
                    src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/private-bathroom.png"
                    alt=""
                    className="w-12"
                  />
                  1 Bathroom
                </div>
              </div>

              {/* room description */}
              <RoomTitleAndDescription room={room} />
              {/* room services */}
              <RoomFeatures />

              {/* room images */}
              <div className="w-full py-12 flex flex-col gap-4">
                <h3 className="text-3xl font-booking_font4">
                  Room Photos
                  <span className="block pt-3 text-base font-booking_font font-normal text-grey">
                    Enjoy the comforts of home and beyond with these distinctive
                    features.
                  </span>
                </h3>
                <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 gap-6">
                  {room?.images?.slice(0, 6).map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={image}
                        alt="room"
                        className="h-[170px] w-full md:h-[300px] object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w"></div> */}
          <RoomPaymentTab
            setAdults={setAdults}
            datemodal={datemodal}
            setDateModal={setDateModal}
            adults={adults}
            setChildrens={setChildrens}
            childrens={childrens}
            guestsmodal={guestsmodal}
            setGuestsModal={setGuestsModal}
            loginmodal={loginmodal}
            setLoginModal={setLoginModal}
            room={room}
          />
        </div>
      </div>
    </>
  );
};

export default RoomLists;
