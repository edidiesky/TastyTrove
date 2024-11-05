import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import { FaRegUser, FaMoneyBill } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BiFoodMenu, BiMessage } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
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
  const [active, setActive] = useState(false);
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
      <HeaderStyles
        style={{
          backdropFilter: "blur(14px)",
        }}
        className="h-[85px] w-full border-b border-[rgba(0,0,0,.08)] bg-[#ffffff4e] flex z-40 sticky top-0 items-center justify-between"
      >
        <div className="Header_wrapper w-[95%] max-w-custom mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
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

            <form
              action=""
              className="max-w-[120px] h-[45px] md:max-w-[160px] md:w-[150px] flex items-center relative"
            >
              <span className="w-4 h-4 absolute left-6">
                <BsSearch />
              </span>
              <input
                type="text"
                placeholder="Search menu"
                className="text-sm pl-12 h-full border font-normal bg-white rounded-full w-full "
              />
            </form>
          </div>
          <div className="flex w-full auto items-center justify-end gap-8">
            <div className="flex profile_wrapper relative items-center gap-2">
              <div className="flex items-center gap-2">
                {currentUser?.image ? (
                  <img
                    onClick={() => setActive(!active)}
                    src={currentUser?.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                  />
                ) : (
                  <img
                    onClick={() => setActive(!active)}
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                  />
                )}
                {/* <h4 className="text-base text-dark family1 family1">
              {currentUser?.name}
              <span className="block font-normal family1 text-xs text-dark">
                {currentUser?.email}
              </span>
            </h4> */}
              </div>
              <div
                style={{ transition: "all .4s ease" }}
                className={`absolute ${
                  active
                    ? "opacity-100 scale-100 visible"
                    : "scale-[0] opacity-0 "
                } py-2 border right-[10%] top-[110%] shadow-lg w-[250px] bg-white rounded-lg`}
              >
                <div className="w-full flex flex-col gap-4">
                  <div className="flex w-full relative pb-3 border-b px-4 items-center gap-4 cursor-pointer">
                    <img
                      src={
                        currentUser?.image
                          ? currentUser?.image
                          : "https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                      }
                      className="w-12 h-12 object-cover rounded-full"
                      alt="Avatar for user"
                    />
                    <span className="text-base family6">
                      {currentUser?.name}
                      <span className="text-xs block family1 font-normal text-[#969A9A]">
                        {currentUser?.email}
                      </span>
                    </span>
                  </div>
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={`/dashboard/profile/${currentUser?.id}`}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Profile
                    </Link>
                    <Link
                      to={"/dashboard/menu"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Menus
                    </Link>
                    <Link
                      to={"/dashboard/orders"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Orders
                    </Link>
                    {currentUser?.role === "ADMIN" && (
                      <Link
                        to={"/dashboard/customers"}
                        className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                      >
                        My Customers
                      </Link>
                    )}
                  </div>
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={"/"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Mode
                    </Link>
                    <Link
                      to={`/dashboard/profile/${currentUser?.id}`}
                      className="text-sm block  font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      Account Settings
                    </Link>
                  </div>
                  <div
                    onClick={handleLogOut}
                    className="w-full hover:bg-[#fafafa] cursor-pointer family1 text-center py-2 font-semibold text-[#d02828ed]"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderStyles>
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
          className="w-full h-full bg-[#fff] Header_wrapper py-4 flex items-start flex-col gap-2"
        >
          <div className="flex px-3 items-center gap-2">
            {currentUser?.image ? (
              <img
                src={currentUser?.image}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
              />
            ) : currentUser?.username ? (
              // <div className="w-12 h-12 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
              //   {currentUser?.username[0]}{" "}
              // </div>
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 h-12 object-cover rounded-full"
              />
            ) : (
              ""
            )}
            <h4 className="text-lg font-bold family1 text-[#000]">
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
                      {<h4 className="text-base">{x.tab?.title}</h4>}
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const HeaderStyles = styled.div`
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
