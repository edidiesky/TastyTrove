// import Image from "next/image";
import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function Top() {
  return (
    <div>
      <div className="w-full topWrapper flex">
        <div className="topleft flex-1">
          <img
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu262x-600x687.jpg"
            className="w-full h-full"
          />
        </div>
        <div className="topright flex-1">
          <div className="flex HeroRightC flex-col gap-12 auto">
            <div className="family3 text-6xl text-white">California Wraps</div>
            <h4 className="text-2xl family2 text-white">
              Tristique tempus condimentum diam donec. Condimentum ullamcorper
              sit elementum hendrerit mi nulla in consequat, ut. Metus, nullam
              scelerisque netus viverra dui pretium pulvinar. Commodo morbi
              amet.
            </h4>
            <div className="w-full gap-4 grid grid-cols-2 text-start">
              <button
                className="btn text-dark btn-2 family1 uppercase text-white text-base py-1"
                style={{ padding: "1rem" }}
              >
                ADD TO CART
              </button>

              <span className="grid h-full  grid-cols-3 border border-[rgba(255,255,255,.6)] items-center justify-between">
                <span className=" h-full w-full flex items-center justify-center border-r border-[rgba(255,255,255,.6)] text-xl text-white cursor-pointer">
                  <BiMinus />
                </span>
                <span className=" h-full w-full flex items-center justify-center border-r border-[rgba(255,255,255,.6)] text-xl text-white cursor-pointer">
                  4
                </span>
                <span className=" h-full w-full text-xl text-white cursor-pointer flex items-center justify-center ">
                  <BiPlus />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
