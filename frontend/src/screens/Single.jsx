import React from "react";
import HomeIndex from "../components/single";
import { useParams, useSearchParams } from "react-router-dom";
import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/common/Banner";
import Navbar from "@/components/common/Navbar";
import Loader from "@/components/loader";
import { getSingleMenu } from "@/features/menu/menuReducer";
const Single = () => {
  const { menu, getallMenuisLoading } = useSelector((store) => store.menu);
  const { food } = useParams();
  const dispatch = useDispatch();

  // decodeURIComponent
  // console.log(decodeURIComponent(food));

  useEffect(() => {
    if (food) {
      dispatch(getSingleMenu(decodeURIComponent(food)));
    }
  }, [food]);
  return (
    <div>
      {/* <Meta title={`Home Detail for ${menu?.title ? menu?.title : ""} `} /> */}
      <Navbar />
      {!getallMenuisLoading && <Loader />}
      <Banner
        type={"type"}
        subtext={"RESTAURANT TAKEOUT"}
        text={"MAIN COURSE"}
      />
      <HomeIndex />
    </div>
  );
};

export default Single;
