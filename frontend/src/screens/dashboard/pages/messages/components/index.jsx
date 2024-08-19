
import React, { useEffect, useState } from "react";
import Message from "./messages";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsers } from "@/features/auth/authReducer";
const DashboardIndex = () => {
  return (
    <div className="w-full">
      <Message />
    </div>
  );
};

export default DashboardIndex;
