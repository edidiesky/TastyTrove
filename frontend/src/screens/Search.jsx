import React from "react";
import HomeIndex from "../components/search";
import Meta from "@/components/common/Meta";
import Navbar from "../components/common/navbar";
const Search = () => {
  return (
    <div>
      <Meta title={"Search for quality Menu - Tastytrove"} />
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default Search;
