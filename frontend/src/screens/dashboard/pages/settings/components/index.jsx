
import React, { useState } from "react";
import Profile from "./profile"
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-8">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <h3 className="text-2xl block lg:text-3xl family6 font-semibold">
            My Account Settings
            <span className="block pt-2 text-base font-normal family1">
              Make changes on your profile
            </span>
          </h3>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default DashboardIndex;
