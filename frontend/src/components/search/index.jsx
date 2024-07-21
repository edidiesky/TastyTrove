import React, {useEffect} from "react";
import Footer from "../common/Footer";
import Banner from "../common/Banner";
import Menulist from "./menulist";
const HomeIndex = () => {
  return (
    <div className=" w-full flex flex-col">
      <Banner
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/page22x.jpg"
        }
        subtext={"Best Table in Town"}
        text={"Our Takeout Menu"}
      />
      <Menulist/>
      <Footer />
    </div>
  );
};

export default HomeIndex;
