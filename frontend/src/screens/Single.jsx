import React, { useEffect } from "react";
import HomeIndex from "../components/single";
import { useParams, useSearchParams } from "react-router-dom";
import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/common/Banner";
import Navbar from "../components/common/navbar";
import Loader from "@/components/loader";
import { getAllMenu, getSingleMenu } from "@/features/menu/menuReducer";
const Single = () => {
  const { menu, getallMenuisLoading } = useSelector((store) => store.menu);
  const { food } = useParams();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
  // decodeURIComponent
  // console.log(decodeURIComponent(food));

  useEffect(() => {
    if (food) {
      dispatch(getSingleMenu(food));
      dispatch(getAllMenu());
    }
  }, [food]);
  if (getallMenuisLoading) {
return <Loader />;
  }
    return (
      <div>
        <Meta
          title={`Details for ${
            menu?.title ? menu?.title : ""
          } - TastyTrove Restaurant`}
        />
        <Navbar />
        <Banner type={"type"} subtext={"RESTAURANT TAKEOUT"} text={category} />
        <HomeIndex />
      </div>
    );
};

export default Single;
