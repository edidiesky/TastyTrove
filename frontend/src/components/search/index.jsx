import React, {useEffect} from "react";
import Navbar from "../common/navbar";
import MainContent from "./main/maincontent";
import Footer from "../common/Footer";
import Newsletter from "../common/Newsletter";
const HomeIndex = () => {
  return (
    <div className="bg-[var(--light-grey)] w-full flex flex-col">
      <Navbar />
      <div className="w-full flex relative gap-4">
        <MainContent />
      </div>
      <Footer/>
    </div>
  );
};

export default HomeIndex;
