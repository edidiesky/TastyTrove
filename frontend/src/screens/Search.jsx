import React from "react";
import HomeIndex from "../components/search";
import Meta from "@/components/common/Meta";
import SmoothScroll from "@/constants/utils/SmoothScroll";
import Navbar from "../components/common/navbar";
const Search = () => {
  return (
    <SmoothScroll>
      <Meta title={"Search for quality Menu - Tastytrove"} />
      <Navbar />
      <HomeIndex />
    </SmoothScroll>
  );
};

export default Search;
