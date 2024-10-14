
import React, { useState } from "react";
import OrderList from "./orderlist";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-4">
        <h3 className="text-3xl block lg:text-4xl family6">
          My Transactions List
          <span className="block pt-3 family1 max-w-[500px] text-base font-normal">
            Make a review of your customers either by adding or modifying their
            content
          </span>
        </h3>
        <OrderList />
      </div>
    </div>
  );
};

export default DashboardIndex;
