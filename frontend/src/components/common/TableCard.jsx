"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import DeleteModal from "../modals/DeleteModal";

const TableCard = ({ x, type }) => {
  const [userdeletemodal, setUserDeleteModal] = useState(false);
  const [menutab, setMenuTab] = useState(false);

  const handleDeleteClient = () => {
    setUserDeleteModal(true);
  };
  if (type === "orderlist") {
    return (
      <>
        {/* <Delete /> */}
        <tr key={x?.id}>
          <td className="text-sm p-6 font-normal">
            <span className="">
              <span>
                {x?.status === "CONFIRMED"
                  ? " Payment made by"
                  : " Payment Canceled by"}
              </span>{" "}
              <span className="family1 font-bold text-dark">
                {x?.user?.name}
              </span>
            </span>
          </td>
          <td className="text-sm p-6 font-normal">₦{Number(x?.amount).toLocaleString()}</td>
          <td className="text-sm p-6 font-normal">{x?.currency}</td>
          <td className="text-sm p-6 font-normal">
            {x?.status === "CONFIRMED" ? (
              <span className="text-xs family1 font-semibold text-center success">
                {x?.status}
              </span>
            ) : (
              <span className="text-xs family1 font-semibold text-center danger">
                {x?.status}
              </span>
            )}
          </td>
          <td className="text-sm p-6 font-normal">
            {x?.deliverystatus === "DELIVERED" ? (
              <span className="text-xs family1 font-semibold text-center success">
                {x?.deliverystatus}
              </span>
            ) : (
              <span className="text-xs family1 font-semibold text-center danger">
                {x?.deliverystatus}
              </span>
            )}
          </td>
          <td className="text-sm p-6 font-normal">{moment(x?.createdAt).format("DD MMMM YYYY")}</td>
          <td className="text-sm p-6 font-normal">
            <Link
              to={`/payment-success/${x?.paymentGroupId}`}
              className="py-2 px-4 w-fit bg-[#eee] text-xs rounded-lg"
            >
              View
            </Link>
          </td>
        </tr>
      </>
    );
  }
  if (type === "sales") {
    return (
      <>
        {/* <Delete /> */}
        <tr key={x?.id}>
          <td className="text-sm p-6 font-normal">{x?.id}</td>
          <td className="text-sm p-6 font-normal">
            <span className="text-sm font-semibold">
              {x?.user?.name}
              <span className="block text-xs text-grey font-normal">
                {x?.user?.email}
              </span>
            </span>
          </td>
          <td className="text-sm p-6 font-normal">₦{Number(x?.amount).toLocaleString()}</td>

          <td className="text-sm p-6 font-normal">
            {/* <span className="p-4">
              {x?.status}
            </span> */}

            {x?.status === "CONFIRMED" ? (
              <span className="text-xs family1 font-semibold text-center success">
                {x?.status}
              </span>
            ) : (
              <span className="text-xs family1 font-semibold text-center danger">
                {x?.status}
              </span>
            )}
          </td>
          <td className="text-sm p-6 font-normal">
            {x?.deliverystatus === "DELIVERED" ? (
              <span className="text-xs family1 font-semibold text-center success">
                {x?.deliverystatus}
              </span>
            ) : (
              <span className="text-xs family1 font-semibold text-center danger">
                {x?.deliverystatus}
              </span>
            )}
          </td>
          <td className="text-sm p-6 font-normal">{moment(x?.createdAt).format("DD MMMM YYYY")}</td>
          {/* <td>NGN</td> */}
        </tr>
      </>
    );
  }
  if (type === "customerlist") {
    return (
      <>
        <AnimatePresence>
          {userdeletemodal && (
            <DeleteModal
              id={x?.id}
              data={x}
              type={"user"}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        {/* <Delete /> */}
        <tr key={x?._id}>
          <td className="text-sm p-6 font-normal">
            <div className="flex flex-col">
              <span className=" font-normal text-dark text-bold">
                {x?.name}
              </span>
              {/* <span className=" font-normal family1 text-dark">{x?.email}</span> */}
            </div>
          </td>
          <td className="text-sm p-6 font-normal">
            <span className=" font-normal family1  text-dark">{x?.email}</span>
          </td>
          <td className="text-sm p-6 font-normal">
            {x?.role === "ADMIN" ? (
              <span className=" font-normal text-xs family1 text-center success">
                Admin
              </span>
            ) : x?.role === "SELLER" ? (
              <span className=" font-normal text-xs family1 text-center success">
                SELLER
              </span>
            ) : (
              <span className=" font-normal text-xs family1 text-center danger">
                User
              </span>
            )}
          </td>

          <td className="text-sm p-6 font-normal">
            <span className="text-dark  font-normal family1 text-light">
              {moment(x?.createdAt).format("DD MMM YYYY")}
            </span>
          </td>
          <td className="text-sm p-6 font-normal">
            <div className="flex items-center justify-center">
              <Link
                to={`/dashboard/profile/${x?.id}`}
                // to={"#"}
                className="w-12 h-12 rounded-full flex hover:shadow-xs hover:bg-[#ddd] items-center justify-center"
              >
                <MdEdit />
              </Link>
              <div
                onClick={handleDeleteClient}
                className="w-12 h-12 rounded-full flex hover:shadow-xs hover:bg-[#ddd] items-center justify-center"
              >
                <BsTrash />
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }
  if (type === "menus") {
    const startDate = moment(x?.createdAt).format("MMMM Do YYYY");
    return (
      <>
        <AnimatePresence>
          {userdeletemodal && (
            <DeleteModal
              id={x?.id}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        <tr key={x?.id}>
          <td className="text-sm p-4 font-normal">
            <div className="flex w-full justify-start items-center gap-4">
              <img
                src={x?.image}
                alt=""
                className="w-12 object-cover rounded-sm"
              />
              <span className="text-sm family1 text-center text-dark">
                {x?.title}
              </span>
            </div>
          </td>
          {/* <td>{x?.address}</td> */}

          <td className="text-sm p-4 font-normal hidden lg:table-cell">{x?.category}</td>
          <td className="text-sm p-4 font-normal">₦{Number(x?.price).toLocaleString()}</td>
          <td className="text-sm p-4 font-normal hidden lg:table-cell">{x?.availabilityCount}</td>

          <td className="text-sm p-4 font-normal">{startDate}</td>

          <td className="text-sm p-4 font-normal">
            <div className="w-full flex items-center gap-2 justify-start relative">
        
              <Link
                to={`/dashboard/menu/${x?.id}`}
                className="justify-center flex cursor-pointer hover:bg-[#eee] w-[40px] h-[40px] rounded-full bg-[#fff] gap-4 text-xs items-center"
              >
                <MdEdit />
              </Link>
              <div
                onClick={() => {
                  handleDeleteClient();
                }}
                className="justify-center flex cursor-pointer hover:bg-[#eee] w-[40px] h-[40px] rounded-full bg-[#fff] gap-4 text-xs items-center"
              >
                <BsTrash color={"var(--red"} />
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }
  if (type === "Reservation") {
    const startDate = moment(x?.startDate).format("DD MMM YYYY");
    const endDate = moment(x?.endDate).format("DD MMM YYYY");
    return (
      <>
        <tr key={x?.id}>
          <td className="text-sm p-6 font-normal">{x?.rooms?.title}</td>
          <td className="text-sm p-6 font-normal">
            {/* <span className="p-4">
              {x?.status}
            </span> */}

            {x?.status === "CONFIRMED" ? (
              <span className=" font-normal text-xs family1 text-center success">
                {x?.status}
              </span>
            ) : (
              <span className=" font-normal text-xs family1 text-center danger">
                {x?.status}
              </span>
            )}
          </td>
          <td className="text-sm p-6 font-normal">
            <span>₦{Number(x?.totalPrice).toLocaleString()}</span>
          </td>
          <td className="text-sm p-6 font-normal">
            <span>{x?.rooms?.city}</span>
          </td>
          <td className="text-sm p-6 font-normal">
            <span>
              {" "}
              {startDate} - {endDate}
            </span>
          </td>
          <td className="text-sm p-6 font-normal">
            <span> {moment(x?.createdAt).format("DD MMM YYYY")}</span>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      {/* <Delete /> */}
      <tr key={x?._id}>
        <td className="text-sm p-6 font-normal">
          <span className=" font-normal family1 text-dark">{x?.plan}</span>
        </td>
        <td className="text-sm p-6 font-normal">
          <span className="text-dark  font-normal family1">$ {x?.price}</span>
        </td>

        <td className="text-sm p-6 font-normal">
          <span className="text-dark  font-normal family1 text-light">
            Type 1
          </span>
        </td>
        <td className="text-sm p-6 font-normal">
          <span className="text-dark  font-normal family1 text-light">
            {x?.date}
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableCard;
