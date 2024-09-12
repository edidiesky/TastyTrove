import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { FaRegUser, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiFoodMenu, BiMessage } from "react-icons/bi";
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
        icon: <LayoutDashboard fontSize={"14px"} />,
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
    //   id: 6,
    //   tab: {
    //     icon: <BiMessage fontSize={"16px"} />,
    //     title: "Messages",
    //     path: "/message",
    //   },
    //   list: [],
    // },
  ];
  return (
    <HeaderStyles
      className={`w-full hidden px-4 z-[40000] lg:flex column gap-2`}
    >
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
                <h4 className="hidden md:flex font-bold flex-col text-base family5">
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
                    className={`group tab
                      relative
                      text-sm w-[90%] mx-auto`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <div className="flex w-full gap-3 md:justify-start relative items-center">
                      <span className="text-sm rounded-xl flex items-center text-blue justify-center">
                        {" "}
                        {x.tab.icon}
                      </span>
                      {x.tab?.title}
                      {/* <div
                        className="span_details absolute text-sm group-hover:opacity-1 
                        opacity-1  block 
                        px-4 py-2 bg-[#000] text-[#fff]
                       rounded-[40px] left-[140%] "
                      >
                        {x.tab?.title}
                      </div> */}
                    </div>
                  </NavLink>
                </div>
              );
            })}
            {currentUser?.role === "ADMIN" && (
              <NavLink
                // activeClassName="active"
                to={`/dashboard/customers`}
                end
                className={`group tab
                      relative
                      text-sm w-[90%] mx-auto`}
              >
                <div className="flex w-full gap-3 relative items-center">
                  <span className=" text-sm rounded-xl flex items-center text-blue justify-center">
                    {" "}
                    <FiSettings fontSize={"16px"} />
                  </span>
                  Clients
                </div>
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
                className={`group tab
                      relative
                      text-sm w-[90%] mx-auto`}
              >
                <div className="flex w-full gap-3 relative items-center">
                  <span className=" text-sm rounded-xl flex items-center text-blue justify-center">
                    {" "}
                    <FiSettings fontSize={"16px"} />
                  </span>
                  Settings
                  {/* <div
                    className="span_details absolute text-sm group-hover:opacity-1 
                        opacity-1  block 
                        px-4 py-2 bg-[#000] text-[#fff]
                       rounded-[40px] left-[140%] "
                  >
                    Settings
                  </div> */}
                </div>
              </NavLink>
            </div>
            <div className=" w-full relative flex gap-1 items-center justify-between">
              <div className="flex w-full gap-2 items-center">
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
                <h4 className="text-base font-bold family5">
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
  width: 300px;
  position: sticky;
  top: 0;
  height: 100vh;
  background: #fafafa;
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
    border-radius: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 18px;
    gap: 2rem;
    position: relative;
    /* background: #fff; */
    .span_details {
      opacity: 0;
      transform: scale(0.89);
      transition: all ease 0.4s;
      top: 55%;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    &:hover {
      background: var(--primary);
      color: #fff;
      .span_details {
        opacity: 1;
        /* transform: ; */
        transform: scale(1);
        top: 25%;
      }
      svg {
        color: #fff;
      }
    }
    &.active {
      position: relative;
      // FD9D2A
      /* 8bca41 */
      /* 8F0EBE */
      /* E3F2FD */
      background: var(--primary);
      color: #fff;
      svg {
        color: #fff;
      }
    }
  }
`;

export default DashboardSidebar;
