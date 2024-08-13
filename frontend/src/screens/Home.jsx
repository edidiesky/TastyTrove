import React, { useLayoutEffect } from "react";
import HomeIndex from "../components/home";
import Meta from "@/components/common/Meta";
import { getAllMenu } from "@/features/menu/menuReducer";

import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/loader";
import Preloader from "@/components/loader/preloader";

const Home = () => {
  const { getallMenuisLoading } = useSelector((store) => store.menu);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAllMenu());
  }, []);
  // if (getallMenuisLoading) {
  //   return <Loader />;
  // }
  return (
    <div>
      <Preloader/>
      <Meta />
      <HomeIndex />
    </div>
  );
};

export default Home;
