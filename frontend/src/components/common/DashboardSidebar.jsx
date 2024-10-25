import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { FaRegUser, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiFoodMenu,BiSolidDashboard, BiMessage } from "react-icons/bi";
import { LayoutDashboard } from "lucide-react";
import { MdRateReview } from "react-icons/md";

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;

  const AdminSidebarData = [
    {
      id: 1,
      tab: {
        title: "Dashboard",
        path: "",
        icon: <BiSolidDashboard fontSize={"16px"} />,
      },
      list: [],
    },
    {
      id: 61,
      tab: {
        icon: <BiFoodMenu fontSize={"16px"} />,
        title: "Menu",
        path: "/menu",
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
      id: 8,
      tab: {
        icon: <MdRateReview fontSize={"16px"} />,
        title: "Reviews",
        path: "/review",
      },
      list: [],
    },
    // {
    //   id: 61,
    //   tab: {
    //     icon: <FaRegUser fontSize={"16px"} />,
    //     title: "Customers",
    //     path: "/customers",
    //   },
    //   list: [],
    // },
    {
      id: 6,
      tab: {
        icon: <BiMessage fontSize={"16px"} />,
        title: "Messages",
        path: "/message",
      },
      list: [],
    },
  ];
  return (
    <HeaderStyles
      className={`w-[310px] bg-[#18171C] lg:block hidden h-[100vh] overflow-auto sticky top-0`}
    >
      <div className="w-full h-full py-4 px-3 justify-between flex items-center flex-col gap-4">
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
                  className="w-12 rounded-full object-cover"
                />
                <h4 className="hidden md:flex text-white flex-col text-base family6">
                  TastyTrove
                  <span className="block font-normal text-grey text-xs family5">
                    {" "}
                    Home of Comfort
                  </span>
                </h4>
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            {AdminSidebarData?.map((x, index) => {
              // console.log(pathname, `/dashboard${x.tab.path}`);
              return (
                <div
                  key={index}
                  className="w-[100%]  family5 font-normal text-sm mx-auto"
                >
                  <NavLink
                    // activeClassName="active"
                    end
                    className={`flex tab family1 py-3 hover:text-white text-[#969a9acb] font-semibold text-sm
                                 rounded-md px-3 hover:bg-[#282c2b] w-full items-center gap-4`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    {x.tab.icon}
                    {x.tab?.title}
                  </NavLink>
                </div>
              );
            })}
            {currentUser?.role === "ADMIN" && (
              <NavLink
                // activeClassName="active"
                to={`/dashboard/customers`}
                end
                className={`flex tab family1 py-3 hover:text-white text-[#969a9acb] font-semibold text-sm
                                 rounded-md px-3 hover:bg-[#282c2b] w-full items-center gap-4`}
              >
                <FiSettings fontSize={"16px"} />
                Clients
              </NavLink>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-between py-1">
          <div className="w-[100%] mx-auto flex flex-col gap-4">
            <div className="w-[100%]  family5 font-normal text-sm mx-auto">
              <NavLink
                // activeClassName="active"
                to={`/dashboard/profile/${currentUser?.id}`}
                end
                className={`flex tab family1 py-3 hover:text-white text-[#969a9acb] font-semibold text-sm
                                 rounded-md px-3 hover:bg-[#282c2b] w-full items-center gap-4`}
              >
                <div className="flex w-full gap-3 relative items-center">
                  <span className=" text-sm rounded-xl flex items-center text-blue justify-center">
                    {" "}
                    <FiSettings fontSize={"16px"} />
                  </span>
                  Settings
                </div>
              </NavLink>
            </div>
            <div className=" w-full relative flex gap-1 items-center justify-between">
              <div className="flex w-full gap-2 items-center">
                {currentUser?.image ? (
                  <img
                    src={currentUser?.image}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : currentUser?.username ? (
                  // <div className="w-10 h-10 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
                  //   {currentUser?.username[0]}{" "}
                  // </div>
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                )}
                <h4 className="text-base text-white family6">
                  {currentUser?.name}
                  <span className="block family5 text-xs font-normal text-grey">
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
  position: sticky;
  top: 0;
  height: 100vh;

  .dropdown {
    max-height: 0;
    transition: all 0.7s;
    &.active {
      max-height: 450px;
      /* min-height: 100px; */
    }
  }

  .tab {
    &:hover {
      background: #282c2b;
      color: #fff;
    }
    .nav_icons:hover {
      svg {
        color: #fff;
      }
    }
    &.active {
      position: relative;
      background: #282c2b;
      color: #fff;

      .nav_icons {
        color: #fff;
      }

      span {
        svg {
          color: #fff;
        }
      }
    }
  }
`;

export default DashboardSidebar;
