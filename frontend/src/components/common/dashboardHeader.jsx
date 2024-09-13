import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import { FaRegUser, FaMoneyBill } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BiFoodMenu, BiMessage } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearUserInfo } from "@/features/auth/authSlice";
import NotificationSidebar from "./NotificationSidebar";
import { MdRateReview } from "react-icons/md";
import { LogoutUser } from "@/features/auth/authReducer";
// import { Bell } from "lucide-react";
const AdminSidebarData = [
  {
    id: 1,
    tab: {
      title: "Dashboard",
      path: "",
      icon: <LayoutDashboard fontSize={"20px"} />,
    },
    list: [],
  },
  {
    id: 61,
    tab: {
      icon: <BiFoodMenu fontSize={"20px"} />,
      title: "Menu",
      path: "/menu",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"20px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },
  {
    id: 8,
    tab: {
      icon: <MdRateReview fontSize={"20px"} />,
      title: "Reviews",
      path: "/review",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <BiMessage fontSize={"20px"} />,
      title: "Messages",
      path: "/message",
    },
    list: [],
  },
  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"18px"} />,
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
  const [notificationactivebar, setNotificationActiveBar] =
    React.useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(LogoutUser());
    dispatch(ClearUserInfo("any"));
    window.location.reload();
  };
  return (
    <>
      <NotificationSidebar
        setNotificationActiveBar={setNotificationActiveBar}
        notificationactivebar={notificationactivebar}
      />
      <HeaderStyles className="w-full z-[3000] py-4 flex relative items-center justify-center">
        <div className="Header_wrapper w-[95%] max-w-custom mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
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
              className="hidden md:grid grid-cols-custom_2 text-dark w-[200px] lg:w-[310px]
             items-center min-h-8  border rounded-[40px] px-4"
            >
              <div className="w-10 text-grey text-lg h-10 bg-[#F1F1F1] rounded-full text-dark flex items-center justify-center">
                <BiSearch />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent family1 text-sm border-none outline-none text-dark"
              />
            </label>
          </div>
          <div className="flex w-full auto items-center justify-end gap-8">
            <div
              onClick={() => setNotificationActiveBar(true)}
              className="w-10 text-grey text-lg relative h-10 bg-[#F1F1F1] rounded-full text-dark flex items-center justify-center"
            >
              <FaBell />
              <div className="w-6 absolute -top-2 -right-2 text-sm h-6 bg-[#777] rounded-full text-[#fff] flex items-center justify-center">
                1
              </div>
            </div>

            {/* <label
              onClick={() => setNotificationActiveBar(true)}
              htmlFor=""
              className="flex cursor-pointer justify-between gap-3 text-dark w-[250px]
             items-center min-h-14 py-1 border rounded-[40px] px-4"
            >
             
            </label> */}

            <div className="flex profile_wrapper relative items-center gap-2">
              <div className="flex items-center gap-2">
                {/* <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-10 rounded-full"
              />
              <h4 className="text-base text-dark family1 family1">
                {currentUser?.name}
                <span className="block font-normal family1 text-xs text-dark">
                  {currentUser?.email}
                </span>
              </h4> */}
                {currentUser?.image ? (
                  <img
                    src={currentUser?.image}
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
                {/* <h4 className="text-base text-dark family1 family1">
              {currentUser?.name}
              <span className="block font-normal family1 text-xs text-dark">
                {currentUser?.email}
              </span>
            </h4> */}
              </div>
              <div className="profile_dropdown shadow absolute">
                <div className="w-full flex flex-col">
                  <div className="p-4 border-b flex items-center gap-4">
                    {currentUser?.image ? (
                      <img
                        src={currentUser?.image}
                        alt=""
                        className="w-14 lg:w-14 h-14 lg:h-14 rounded-full"
                      />
                    ) : (
                      <img
                        src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                        alt=""
                        className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
                      />
                    )}
                    <h4 className="text-base text-dark font-bold family1">
                      {currentUser?.name}
                      <span className="block font-normal family1 text-xs text-dark">
                        Seller Account
                      </span>
                    </h4>
                  </div>
                  <div className="flex profile_dropdown_bottom flex-col w-full">
                    <NavLink
                      to={"/dashboard"}
                      className="flex items-center gap-3 font-booking_font_bold text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                    >
                      <LayoutDashboard
                        width={"20px"}
                        height={"20px"}
                        fontSize={"10px"}
                      />{" "}
                      Dashboard
                    </NavLink>
                    <NavLink
                      to={"/dashboard/settings"}
                      className="flex items-center gap-3 font-booking_font_bold text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                    >
                      <FaRegUser fontSize={"15px"} /> Profile
                    </NavLink>
                    <div
                      onClick={handleLogOut}
                      className="flex items-center gap-3 border-t font-booking_font_bold hover:bg-[#f7f7f7] text-xs p-8 h-[45px] px-2 family1 w-full profile_list text-dark"
                    >
                      <LogOut color="var(--red)" fontSize={"13px"} /> Log Out
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
          } w-[300px] bg-[#fff] border-r shadow-2xl  h-full transition-all ease duration-700 fixed flex lg:hidden top-0 flex-col gap-2`}
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
            className="w-full h-full bg-[#fafafa] Header_wrapper py-4 flex items-start flex-col gap-2"
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
              <h4 className="text-base family1 text-[#000]">
                {currentUser?.name}
                <span className="block font-normal family1 text-xs text-[#000]">
                  {currentUser?.email}
                </span>
              </h4>
            </div>
            <div className="w-full my-12 flex flex-col">
              {AdminSidebarData?.map((x, index) => {
                return (
                  <div key={index} className="w-full mx-auto">
                    <NavLink
                      onClick={() => setBar(!bar)}
                      end
                      className={`
                      text-xm w-[90%] mx-auto text-[#000] family1`}
                      to={`/dashboard${x.tab.path}`}
                    >
                      <div className="flex items-center">
                        <span className="w-12 h-12 text-lg rounded-xl flex items-center text-[#00] justify-center">
                          {" "}
                          {x.tab.icon}
                        </span>
                        {<h4 className="text-xs">{x.tab?.title}</h4>}
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </HeaderStyles>
    </>
  );
};

export const HeaderStyles = styled.div`
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
    width: 240px;
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
    padding: 10px 14px;
    margin: 0 auto;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;

    &:hover {
      background: #eee;
    }
    &.active {
      position: relative;
      background: #eee;
    }
  }
`;

export default DashboardHeader;
