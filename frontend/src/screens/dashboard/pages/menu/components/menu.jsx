import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import Loader from "@/components/home/loader";
import { handlePage } from "@/features/menu/menuSlice";

const RoomsList = () => {
  const dispatch = useDispatch();
  const { menus, getallRoomisLoading, page, noOfPages } = useSelector(
    (store) => store.menu
  );
  return (
    <>
      {getallRoomisLoading && <Loader />}
      {menus?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 w-full">
          <img
            src="/images/no_result.jpg"
            alt=""
            className="w-[300px] md:w-[400px]"
          />
          <span className="block text-base font-normal family5">
            You have not created any product
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-6">
          <div className="w-full flex flex-col gap-4">
            <Table>
              <div className="TableContainer">
                <table className="tableWrapper">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Room Name</th>
                      {/* <th>Location</th> */}
                      <th className="hidden lg:table-cell">Category</th>
                      <th>Price</th>
                      <th className="hidden lg:table-cell">Availability</th>
                      <th>Date Created</th>
                      <th>Manage Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus?.map((x, index) => {
                      return <TableCard x={x} type={"menus"} key={x?._id} />;
                    })}
                  </tbody>
                </table>
              </div>
            </Table>
            {menus?.length !== 0 && (
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
        </div>
      )}
    </>
  );
};

export default RoomsList;
