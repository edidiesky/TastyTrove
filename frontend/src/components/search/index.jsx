import React, {useEffect} from "react";
import Footer from "../common/Footer";
import Banner from "../common/Banner";
const HomeIndex = () => {
  return (
    <div className="bg-[var(--light-grey)] w-full flex flex-col">
      <Banner
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/page22x.jpg"
        }
        subtext={"Best Table in Town"}
        text={"Our Takeout Menu"}
      />
      <Footer />
    </div>
  );
};

export default HomeIndex;
