import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SingleTakout() {
  const { menus } = useSelector((store) => store.menu);
  return (
    <div className="w-full flex items-center justify-center py-40 relative">
      <img
        loading="lazy"
        src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu372x.jpg"
        className="w-full h-full z-20 top-0 absolute object-cover"
      />
      <div className="flex md:flex-row flex-col w-85 z-40 auto">
        <div className="flex-1 md:flex-[0.5] bg-[#000] flex-col flex gap-12 px-12 md:px-20 py-24">
          <h1 className="family3 flex items-start gap-4 justify-between leading-[1.6] text-6xl md:text-7xl text-white">
            <span className="leading-[1.3]">{menus[0]?.title}</span>
            <span className="family1 pt-8 text-xl">${menus[0]?.price}</span>
          </h1>
          <h4 className="text-xl md:text-2xl  family2 text-light text-[var(--grey-1)]">
            {menus[0]?.description}
          </h4>
          <div className="w-full text-start">
            <Link
              to={`restaurant/takeout/${menus[0]?.id}?category=${menus[0]?.category}`}
              className="btn text-dark btn-2 family1 uppercase text-white text-light text-base py-2"
            >
              View This Menu
            </Link>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
