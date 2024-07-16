import { Outlet } from "react-router-dom";
import React from "react";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import DashboardHeader from "@/components/common/dashboardHeader";
const DashboardLayout = () => {
  return (
    <>
      <div className="w-full relative bg-[#f9f9f9] flex">
        <DashboardSidebar />
        <div className="flex w-full flex-col gap-6">
          <DashboardHeader />
          <div className="px-4 py-8 lg:px-6 bg-[#f9f9f9] w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
