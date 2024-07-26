import { Outlet } from "react-router-dom";
import React from "react";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import DashboardHeader from "@/components/common/dashboardHeader";
import styled from "styled-components";
const DashboardLayout = () => {
  return (
    <>
      <DashboardStyles className="w-full relative bg-[#fff] flex">
        <DashboardSidebar />
        <div className="flex w-full flex-col gap-6">
          <DashboardHeader />
          <div className="px-4 py-8 lg:px-6 bg-[#fff] w-full">
            <Outlet />
          </div>
        </div>
      </DashboardStyles>
    </>
  );
};

const DashboardStyles = styled.div`
  font-family: "Work Sans", sans-serif !important;
`;

export default DashboardLayout;
