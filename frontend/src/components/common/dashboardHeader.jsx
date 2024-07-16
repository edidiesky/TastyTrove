"use client";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { FaRegUser, FaHotel } from "react-icons/fa";
import { TiHome, TiMessage } from "react-icons/ti";
// import { usePathname } from "next/navigation";
import { RxTimer } from "react-icons/rx";
import { LuBedDouble } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearUserInfo } from "@/features/auth/authSlice";
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

const DashboardHeader = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const [bar, setBar] = React.useState(false);
  const [activeindex, setActiveIndex] = useState(0);
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(ClearUserInfo("any"));
    window.location.reload();
  };
  return (
    <HeaderStyles className="w-full z-[3000] bg-[#151515] border-b flex relative items-center justify-center">
      <div className="Header_wrapper w-[95%] mx-auto flex items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <div
            onClick={() => setBar(!bar)}
            className="flex flex-1 lg:hidden gap-4 items-center justify-start text-dark"
          >
            {bar ? (
              <RxCross1 fontSize={"30px"} />
            ) : (
              <HiBars3BottomLeft fontSize={"30px"} />
            )}
          </div>

          <label
            htmlFor=""
            className="hidden md:flex text-xl text-dark w-[200px] lg:w-[250px]
             items-center gap-2 h-12 border rounded-[10px] bg-[#f9f9f9] px-4"
          >
            <div className=" text-dark flex items-center justify-center">
              <BiSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent font-booking_font4 border-none outline-none text-base text-dark flex-1"
            />
          </label>
        </div>
        <div className="flex w-full auto items-center justify-end gap-1">
          <div className="flex profile_wrapper relative items-center gap-2">
            <div className="flex items-center gap-2">
              {/* <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-10 rounded-full"
              />
              <h4 className="text-base text-dark font-booking_font4 family1">
                {currentUser?.name}
                <span className="block font-normal font-booking_font text-xs text-dark">
                  {currentUser?.email}
                </span>
              </h4> */}
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
              <h4 className="text-base text-dark font-booking_font4 family1">
                {currentUser?.name}
                <span className="block font-normal font-booking_font text-xs text-dark">
                  {currentUser?.email}
                </span>
              </h4>
            </div>
            <div className="profile_dropdown shadow-2xl absolute">
              <div className="w-full flex flex-col">
                <div className="flex profile_dropdown_bottom flex-col w-full">
                  <NavLink
                    end
                    to={"/dashboard"}
                    className="flex items-center font-booking_font_bold text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    end
                    to={"/dashboard/settings"}
                    className="flex items-center font-booking_font_bold text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                  >
                    Profile
                  </NavLink>
                  <div
                    onClick={handleLogOut}
                    className="flex items-center font-booking_font_bold hover:bg-[#f7f7f7] text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ zIndex: "200" }}
        className={`${
          bar ? "left-0" : "-left-[100%]"
        } w-[300px] bg-[#151515] border-r shadow-2xl  h-full transition-all ease duration-700 fixed flex lg:hidden top-0 flex-col gap-2`}
      >
        <div
          onClick={() => setBar(!bar)}
          style={{ zIndex: "200" }}
          className={`${
            bar ? "left-0" : "-left-[100%]"
          } w-full h-full transition-all ease duration-300 fixed flex lg:hidden top-0 bg-[#42424227] flex-col gap-2`}
        ></div>
        {/* <div className="w-full h-full absolute bg-[#fff] z-[24] object-cover" /> */}
        <div
          style={{ zIndex: "200" }}
          className="w-full h-full bg-[#151515] Header_wrapper py-4 flex items-start flex-col gap-2"
        >
          <div className="flex px-3 items-center gap-2">
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
           ""
            )}
            <h4 className="text-base font-booking_font4 text-white">
              {currentUser?.name}
              <span className="block font-normal font-booking_font text-sm text-white">
                {currentUser?.email}
              </span>
            </h4>
          </div>
          <div className="w-full my-4 flex flex-col">
            {AdminSidebarData?.map((x, index) => {
              return (
                <div key={index} className="w-full mx-auto">
                  <NavLink
                    onClick={() => setBar(!bar)}
                    end
                    className={`
                      text-xm w-[90%] mx-auto text-white font-booking_font4`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <div className="flex items-center">
                      <span className="w-12 h-12 text-lg rounded-xl flex items-center text-blue justify-center">
                        {" "}
                        {x.tab.icon}
                      </span>
                      {<h4>{x.tab?.title}</h4>}
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export const HeaderStyles = styled.div`
  padding: 0.5rem 0;
  min-height: 4.8rem;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  .profile_wrapper:hover .profile_dropdown {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
  .profile_dropdown {
    width: 130px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s;
    overflow: hidden;
    visibility: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
    z-index: 220;
    background: #fff;
    top: 100%;
    right: 0%;
    border-radius: 10px;
    .profile_card {
      padding: 1.3rem 1.5rem;

      cursor: pointer;
    }
  }
  .profile_list {
    padding: 10px 2rem;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;

    &:nth-last-child() {
      border-bottom: none;
    }
  }
  .dropdown {
    max-height: 0;
    transition: all 0.7s;
    /* min-height: 0; */
    &.active {
      max-height: 450px;
      /* min-height: 100px; */
    }
  }
  a,
  .tab {
    padding: 7px 14px;
    margin: 0 auto;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    svg {
      color: #fff;
    }

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
      color: #fff;
      svg {
        color: #fff;
      }
    }
  }
`;

export default DashboardHeader;
