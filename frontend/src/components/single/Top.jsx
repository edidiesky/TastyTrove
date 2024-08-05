// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { onLoginModal } from "@/features/modals/modalSlice";
import Loader from "../loader";
import { CreateCart } from "@/features/cart/cartReducer";
import { clearCartAlert } from "@/features/cart/cartSlice";
import Button from "../common/Button";

export default function Top() {
  const { menu, getallMenuisLoading } = useSelector((store) => store.menu);
  const [bookingloading, setBookingLoading] = useState(false);
  const [bookingdata, setBookingData] = useState(null);
  const { currentUser, token } = useSelector((store) => store.auth);
  const { createCartisSuccess, cartDetails, createCartisLoading } = useSelector(
    (store) => store.cart
  );
  const [count, setCount] = useState(1);
  const [countpieces, setCountPieces] = useState(1);
  const totalPrice = menu?.price * count;
  const menudata = {
    totalCount: count,
    totalPrice: totalPrice,
  };
  // console.log(menudata);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReservationBooking = async () => {
    if (currentUser) {
      dispatch(CreateCart({ roomId: menu?.id, cart: menudata }));
    } else {
      dispatch(onLoginModal());
    }
  };

  useEffect(() => {
    dispatch(clearCartAlert());
  }, []);
  useEffect(() => {
    // dispatch(clearCartAlert());
    if (createCartisSuccess) {
      const interval = setTimeout(() => {
        navigate(`/restaurant/cart`);
      }, 4000);
      return () => clearTimeout(interval);
    }
  }, [createCartisSuccess]);
  // availabilityCount

  return (
    <div>
      <div className="w-full topWrapper items-start grid md:grid-cols-2">
        <div className="topleft h-full">
          <img
            loading="lazy"
            src={
              menu?.image
              // ? menu?.image
              // : "https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu262x-600x687.jpg"
            }
            className="w-full z-10 h-full object-cover"
          />
          <div className="absolute z-20 bottom-10 w-full flex items-center px-12">
            <p className="text-3xl text-white family4">${menu?.price}</p>
          </div>
        </div>
        <div className="topright">
          <div className="flex HeroRightC flex-col gap-8 auto">
            <div className="family3 text-5xl md:text-6xl text-white">
              {menu?.title}
            </div>
            <h4 className="text-xl leading-[1.4] family2 text-white">
              {/* Tristique tempus condimentum diam donec. Condimentum ullamcorper
              sit elementum hendrerit mi nulla in consequat, ut. Metus, nullam
              scelerisque netus viverra dui pretium pulvinar. Commodo morbi
              amet. */}
              {menu?.description}
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-base md:text-xl text-grey family4">
                Number of {menu?.category}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-20 h-12 cursor-pointer rounded-lg hover:text-[#fff] text-grey family4 bg-[#404040] justify-center flex items-center text-xl family1">
                  4pcs
                </div>

                <div className="w-20 h-12 cursor-pointer rounded-lg text-[#fff] family4 bg-[#737373] justify-center flex items-center text-xl family1">
                  10pcs
                </div>

                <div className="w-20 h-12 cursor-pointer rounded-lg hover:text-[#fff] text-grey family4 bg-[#404040] justify-center flex items-center text-xl family1">
                  4pcs
                </div>
              </div>
            </div>
            <p className="text-2xl text-white family4">${menu?.price}</p>
            <div className="w-full gap-8 grid md:grid-cols-2 lg:grid-cols-2 text-start">
              <button
                onClick={handleReservationBooking}
                className="h-[55px] w-[200px] text-sm"
              >
                <Button
                  type={"white"}
                  text={
                    createCartisLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        Loading
                        <Loader type={"dots"} />
                      </span>
                    ) : (
                      <>
                        {menu?.availabilityCount === 0
                          ? "UNAVAILABLE"
                          : "ADD TO CART"}
                      </>
                    )
                  }
                  bgColor={"var(--primary)"}
                />
              </button>

              {/* <button
                onClick={handleReservationBooking}
                className={`${
                  menu?.availabilityCount === 0
                    ? "bg-[var(--primary-1)] opacity-[.1] cursor-not-allowed"
                    : ""
                } btn text-dark btn-2 family1 uppercase text-white text-sm lg:text-base py-1`}
                style={{ padding: "1rem" }}
              >
                {createCartisLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    Loading
                    <Loader type={"dots"} />
                  </span>
                ) : (
                  <>
                    {menu?.availabilityCount === 0
                      ? "UNAVAILABLE"
                      : "ADD TO CART"}
                  </>
                )}
              </button> */}

              <span className="grid h-[50px] md:h-full  grid-cols-3 border border-[rgba(255,255,255,.6)] items-center justify-between">
                <button
                  onClick={() => setCount(count - 1)}
                  disabled={count <= 1}
                  className=" h-full w-full flex items-center justify-center border-r
                   border-[rgba(255,255,255,.6)] text-base text-white cursor-pointer"
                >
                  <BiMinus />
                </button>
                <span
                  className=" h-full family1 w-full flex items-center justify-center 
                border-r border-[rgba(255,255,255,.6)] text-base lg:text-xl text-white cursor-pointer"
                >
                  {count}
                </span>
                <button
                  onClick={() => setCount(count + 1)}
                  disabled={count === menu?.availabilityCount}
                  className=" h-full w-full text-base text-white cursor-pointer flex items-center justify-center "
                >
                  <BiPlus />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


