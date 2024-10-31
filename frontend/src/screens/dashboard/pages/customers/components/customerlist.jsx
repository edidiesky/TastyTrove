import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";

import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useDispatch, useSelector } from "react-redux";
import { handlePage } from "@/features/auth/authSlice";

const RoomsList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();

  const { users, noOfPages, page } = useSelector((store) => store.auth);
  return (
    <div className="w-full">
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Customer Name</th>
                <th>Email</th>
                <th className="">Role</th>
                <th>Date Created</th>
                <th>Manage Customer</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((x, index) => {
                return <TableCard x={x} type={"customerlist"} key={x?._id} />;
              })}
            </tbody>
          </table>
        </div>
      </Table>
      {users?.length !== 0 && (
        <div className="w-full family1 flex items-center justify-end gap-4">
          <button
            disabled={page === 1}
            onClick={() => dispatch(handlePage("prev"))}
            className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.2)]"
          >
            <BiChevronLeft />
          </button>
          {page}
          <button
            disabled={noOfPages === page}
            onClick={() => dispatch(handlePage("next"))}
            className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
          >
            {" "}
            <BiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomsList;
