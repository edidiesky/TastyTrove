import React from "react";
import HomeIndex from "../components/search";
import Meta from "@/components/common/Meta";
import Navbar from "@/components/common/navbar";
// import Navbar from "@/components/common/Navbar";
const Search = () => {
  return (
    <div>
      <Meta title={"Search for quality homes"} />
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default Search;
