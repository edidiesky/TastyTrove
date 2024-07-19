// import Image from "next/image";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Top() {
  const { menu, getallMenuisLoading } = useSelector((store) => store.menu);
  const [count, setCount] = useState(1);
  const [countpieces, setCountPieces] = useState(1);
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
            <div className="family3 text-6xl text-white">{menu?.title}</div>
            <h4 className="text-xl leading-[1.4] family2 text-white">
              {/* Tristique tempus condimentum diam donec. Condimentum ullamcorper
              sit elementum hendrerit mi nulla in consequat, ut. Metus, nullam
              scelerisque netus viverra dui pretium pulvinar. Commodo morbi
              amet. */}
              {menu?.description}
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-xl text-grey family4">
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
            <div className="w-full gap-4 grid grid-cols-2 text-start">
              <button
                className="btn text-dark btn-2 family1 uppercase text-white text-base py-1"
                style={{ padding: "1rem" }}
              >
                ADD TO CART
              </button>

              <span className="grid h-full  grid-cols-3 border border-[rgba(255,255,255,.6)] items-center justify-between">
                <button
                  onClick={() => setCount(count - 1)}
                  disabled={count <= 1}
                  className=" h-full w-full flex items-center justify-center border-r border-[rgba(255,255,255,.6)] text-xl text-white cursor-pointer"
                >
                  <BiMinus />
                </button>
                <span className=" h-full w-full flex items-center justify-center border-r border-[rgba(255,255,255,.6)] text-xl text-white cursor-pointer">
                  {count}
                </span>
                <button
                  onClick={() => setCount(count + 1)}
                  disabled={count === menu?.availabilityCount}
                  className=" h-full w-full text-xl text-white cursor-pointer flex items-center justify-center "
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
