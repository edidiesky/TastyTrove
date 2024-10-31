// import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import DashboardIndex from "./components";
import { useEffect } from "react";
import { GetAllUsers } from "@/features/auth/authReducer";
import Loader from "@/components/loader";

export default function Customers() {
  const dispatch = useDispatch()
 const { users, getallUserisLoading, page } = useSelector(
   (store) => store.auth
 );
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [page]);
  if (getallUserisLoading) {
    return <Loader/>
  }
    return (
      <div className="py-12">
        <DashboardIndex />
      </div>
    );
}
