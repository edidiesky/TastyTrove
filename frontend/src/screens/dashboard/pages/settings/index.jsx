// import Head from "next/head";
import { useDispatch } from "react-redux";
import DashboardIndex from "./components";
import Meta from "@/components/common/Meta";

import { useEffect } from "react";
import { GetSingleUser } from "@/features/auth/authReducer";
import { useParams } from "react-router-dom";

export default function Settings() {
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(GetSingleUser(id))
  }, [id]);
  return (
    <div>
      <Meta title={"Update User Profile"} />
      <DashboardIndex />
    </div>
  );
}
