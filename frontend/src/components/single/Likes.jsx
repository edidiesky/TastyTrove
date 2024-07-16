import { menudata } from "@/data/menu";
import React from "react";
// import Card from "../common/Card";

export default function Related() {
  return (
    <div>
      <div className="flex w-100 column gap-2 flex-1">
        <div className="family3 text-5xl uppercase text-light text-dark">
          Related products
        </div>
        {/* <div className="wrapper w-100">
          {menudata.slice(0, 3).map((x, index) => {
            return <Card x={x} index={index} />;
          })}
        </div> */}
      </div>
    </div>
  );
}
