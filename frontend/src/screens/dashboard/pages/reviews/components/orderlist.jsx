
import React, { useState } from "react";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { handlePage } from "@/features/menu/menuSlice";
const Reviews = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const { payments, page } = useSelector((store) => store.payment);
  return (
    <div className="w-full bg-[#FAFAFA] p-4 px-6 rounded-[20px]">
     
    </div>
  );
};

export default Reviews;
