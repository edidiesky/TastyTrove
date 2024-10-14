import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useSelector } from "react-redux";

const RoomsList = () => {
  //   const [roommodal, setRoomModal] = useState(false);
    const { users, getallRoomisLoading } = useSelector((store) => store.auth);
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
     
    </div>
  );
};

export default RoomsList;
