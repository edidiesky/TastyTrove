import styled from "styled-components";
import React from "react";
const DashboardBanner = ({ title }) => {
  // const { userInfo } = useAppSelector(store => store.auth)
  const userInfo = {};
  return (
    <div className="h-[14rem] rounded-[20px] overflow-hidden relative w-full">
      <img
        src="https://images.unsplash.com/photo-1714556982592-dd2eaedf6bea"
        alt=""
        className="w-full z-20 h-full absolute object-cover"
      />
      <div className="w-full h-full absolute bg-[#000] opacity-[.5] z-[24] object-cover" />
      <div className="w-full h-full z-30 flex items-center justify-start">
        <div className="w-[95%] auto z-30 px-4 flex flex-col gap-1">
          <h2 className="text-5xl z-30 text-white">{title}</h2>
          <h4 className="text-2xl text-grey family1">
            Welcome back {userInfo?.username || "Bill Megaton"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
