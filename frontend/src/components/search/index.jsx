import React, { useEffect } from "react";
import Footer from "../common/Footer";
import Banner from "../common/Banner";
import Menulist from "./menulist";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenu } from "@/features/menu/menuReducer";
import Loader from "../loader";
const HomeIndex = () => {
  const dispatch = useDispatch();
  const { getallMenuisLoading } = useSelector((store) => store.menu);
  useEffect(() => {
    dispatch(getAllMenu());
  }, []);
  if (getallMenuisLoading) {
    return <Loader />;
  }
  return (
    <div className=" w-full flex flex-col">
      <Banner
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/page22x.jpg"
        }
        subtext={"Best Table in Town"}
        text={"Our Takeout Menu"}
      />
      <Menulist />
      <Footer />
    </div>
  );
};

export default HomeIndex;
