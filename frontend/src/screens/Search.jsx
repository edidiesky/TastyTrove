import React from "react";
import HomeIndex from "../components/search";
import Meta from "@/components/common/Meta";
const Search = () => {
  return (
    <div>
      <Meta title={"Search for quality homes"} />
      <HomeIndex />
    </div>
  );
};

export default Search;
