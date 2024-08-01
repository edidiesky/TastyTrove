import React, { useState } from "react";
import Reviews from "./orderlist";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <h3 className="text-4xl lg:text-5xl font-bold family1">
            A summary of your
            <br /> product Reviews
            <span className="block pt-3 text-base font-normal">
             This provides you a summary of all the menu reviewed by users
            </span>
          </h3>
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default DashboardIndex;
