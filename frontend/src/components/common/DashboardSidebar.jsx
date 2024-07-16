"use client";
import React, { useState } from "react";
import styled from "styled-components";
// import { usePathname } from "next/navigation";
import { TiHome } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminSidebarData = [
  {
    id: 1,
    tab: {
      title: "Dashboard",
      path: "",
      icon: <TiHome fontSize={"18px"} />,
    },
    list: [],
  },
  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"16px"} />,
      title: "Rooms",
      path: "/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"16px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"16px"} />,
      title: "Reservation",
      path: "/reservation",
    },
    list: [],
  },
  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"16px"} />,
      title: "Clients",
      path: "/customers",
    },
    list: [],
  },
];

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <HeaderStyles className={`w-full hidden lg:flex column gap-2`}>
      <div className="w-full h-full py-4 justify-between flex items-center flex-col gap-4">
        <div className="w-full h-[90%] flex flex-col gap-8">
          <div className="flex flex-col w-full items-start justify-between py-1">
            {/* <h4 className="text-sm text-[#000]">RockTrading</h4> */}
            <div className=" w-[90%] mx-auto relative flex gap-4 items-center flex-col justify-between">
              <Link
                to={"/"}
                className="w-full flex items-center gap-1 justify-start"
              >
                <img
                  loading="lazy"
                  src="https://www.hopper.com/assets/treasure-D-5S8iOp.svg"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <h4 className="hidden md:flex flex-col text-sm font-booking_font4 text-[#fff]">
                 
                  Zyra&Stones
                  <span className="block text-grey text-xs font-booking_font">
                    {" "}
                 Home of Comfort
                  </span>
                </h4>
              </Link>
            </div>
          </div>
          <div className="w-full my-4 flex flex-col gap-1">
            {AdminSidebarData?.map((x, index) => {
              // console.log(pathname, `/dashboard${x.tab.path}`);
              return (
                <div
                  key={index}
                  className="w-[90%] font-booking_font4 font-normal text-sm mx-auto"
                >
                  <NavLink
                    // activeClassName="active"
                    end
                    className={` tab
                      text-base w-[90%] mx-auto text-[#fff]`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <div className="flex items-center">
                      <span className="w-12 h-12 text-base rounded-xl flex items-center text-blue justify-center">
                        {" "}
                        {x.tab.icon}
                      </span>
                      {<span>{x.tab?.title}</span>}
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-between py-1">
          <div className="w-[90%] mx-auto flex flex-col gap-4">
            <NavLink
              // activeClassName="active"
              end
              className={`text-sm tab flex items-center gap-4 p-[12px] px-4 font-booking_font4 text-[#fff] family1`}
              to={`/dashboard/profile/${currentUser?.id}`}
            >
              <FiSettings fontSize={"24px"} />
              Settings
            </NavLink>
            <div className=" w-full relative px-2 flex gap-1 items-center justify-between">
              <div className="flex flex-1 gap-2 items-center">
                {currentUser?.image ? (
                  <img
                    src={currentUser?.image}
                    alt=""
                    className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
                  />
                ) : currentUser?.username ? (
                  // <div className="w-12 h-12 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
                  //   {currentUser?.username[0]}{" "}
                  // </div>
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
                  />
                ) : (
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
                  />
                )}
                <h4 className="text-base text-[#fff] font-booking_font4">
                  {currentUser?.name}
                  <span className="block font-booking_font text-xs font-normal text-grey">
                    {currentUser?.email}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export const HeaderStyles = styled.div`
  width: 350px;
  position: sticky;
  top: 0;
  height: 100vh;
  background: #151515;
  /* border-right: 1px solid rgba(0, 0, 0, 0.1); */

  .dropdown {
    max-height: 0;
    transition: all 0.7s;
    &.active {
      max-height: 450px;
      /* min-height: 100px; */
    }
  }

  .tab {
    margin: 0 auto;
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;

    &:hover {
      background: #3a616a;
      color: #fff;
      svg {
        color: #fff;
      }
    }
    &.active {
      position: relative;
      background: #3a616a;
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: #fff;

      span {
        svg {
          color: #fff;
        }
      }
    }
  }
`;

export default DashboardSidebar;
