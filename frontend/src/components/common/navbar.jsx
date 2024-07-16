"use client";
import React from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AnimateText from "@/animations/AnimateText";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { onLoginModal } from "@/features/modals/modalSlice";
const linkData = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Search",
    path: "search",
  },
  {
    title: "My Favourites",
    path: "savedhomes",
  },
  {
    title: "My Trips",
    path: "trips",
  },
  // {
  //   title: "About & FAQ",
  //   path: "about",
  // },
];

const Navbar = () => {
  const [bar, setBar] = React.useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(ClearUserInfo());
    window.location.reload();
  };
  return (
    <>
      <div className="p-3 z-[50] bg-[var(--grey-1)] px-2 md:px-8 min-h-[72px] sticky top-0 left-0 flex items-center justify-center">
        <div className="w-full flex items-center gap-2 justify-between">
          <Link to={"/"} className=" flex items-center gap-1 justify-start">
            <img
              alt="Cotion"
              width={0}
              sizes="100vw"
              height={0}
              loading="lazy"
              src="https://www.hopper.com/assets/treasure-D-5S8iOp.svg"
              className="w-14 h-14 rounded-full object-cover"
            />
            <h4 className="hidden md:flex flex-col text-sm md:text-base font-booking_font4 text-dark">
              Zyra&Stones{" "}
              <span className="block text-grey text-xs font-booking_font">
                {" "}
                Home of Comfort
              </span>
            </h4>
          </Link>
          <div className="items-center justify-start hidden lg:flex gap-4">
            {linkData?.map((list, index) => {
              return (
                <Link
                  to={`/${list.path}`}
                  key={index}
                  className={`text-sm hover:text-grey font-booking_font4 flex items-center gap-2 p-3 px-3 rounded-[40px]`}
                >
                  {/* <img src={list?.icon} className="w-4" alt="" /> */}
                  <AnimateText children={list?.title} />
                </Link>
              );
            })}
          </div>

          {/* <img src="/images/TestLogo.png" alt="" className="w-40" /> */}

          <div className="flex items-center justify-end gap-4">
            <ProfileDropdownStyles className=" relative flex items-end justify-end gap-4">
              {/* <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full bg-[#000] flex items-center justify-center text-2xl text-white">
                <BiCart />
              </div> */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="flex profile_wrapper relative items-center justify-end gap-2">
                    <div className="profile_dropdown shadow-2xl absolute">
                      <div className="w-full flex flex-col">
                        {currentUser?.isAdmin ? (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            <Link
                              to={"/dashboard"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Dashboard
                            </Link>
                            <Link
                              to={"/dashboard/settings"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Profile
                            </Link>
                            <Link
                              to={"/trips"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Reservation
                            </Link>
                            <Link
                              to={"/savedhomes"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Favourites
                            </Link>
                            <div
                              onClick={() => handleLogOut()}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Log Out
                            </div>
                          </div>
                        ) : currentUser?.email ? (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            <Link
                              to={"/trips"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Reservation
                            </Link>
                            <Link
                              to={"/savedhomes"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Favourites
                            </Link>
                            <Link
                              href={"/dashboard/settings"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Orders
                            </Link>
                            <div
                              onClick={() => handleLogOut()}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Log Out
                            </div>
                          </div>
                        ) : (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            <div
                              onClick={() => dispatch(onRegisterModal())}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Sign Up
                            </div>
                            <div
                              onClick={() => dispatch(onLoginModal())}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list text-dark block"
                            >
                              Sign In
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                      {currentUser && (
                        <h4 className="text-sm hidden lg:block font-booking_font4 text-dark family1">
                          {currentUser?.name}
                          <span className="block font-normal font-booking_font text-xs text-dark">
                            {currentUser?.email}
                          </span>
                        </h4>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setBar(true)}
                    className="flex text-3xl text-dark lg:hidden"
                  >
                    <HiBars3BottomRight />
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-4">
                  <div
                    onClick={() => dispatch(onLoginModal())}
                    className="btn text-xs text-center p-4 font-booking_font4 text-white px-6 rounded-[40px]"
                  >
                    <AnimateText children={" Book Your Stay"} />
                  </div>
                  <span
                    onClick={() => setBar(true)}
                    className="flex text-3xl text-dark lg:hidden"
                  >
                    <HiBars3BottomRight />
                  </span>
                </span>
              )}
            </ProfileDropdownStyles>
          </div>
        </div>
      </div>
      <div
        style={{ zIndex: "200" }}
        className={`${
          bar ? "left-0" : "-left-[100%]"
        } w-[300px] h-full transition-all ease duration-700 fixed flex lg:hidden top-0 bg-[#fff] shadow-2xl column gap-2`}
      >
        <div
          onClick={() => setBar(!bar)}
          style={{ zIndex: "200" }}
          className={`${
            bar ? "left-0" : "-left-[100%]"
          } w-full h-full transition-all ease duration-300 fixed flex lg:hidden top-0 bg-[#42424227] column gap-2`}
        ></div>

        <div
          style={{ zIndex: "200" }}
          className="w-full Header_wrapper h-full bg-white flex item-center flex-col gap-4"
        >
          {currentUser && (
            <div className="flex p-4 items-center gap-2">
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
              {currentUser && (
                <h4 className="text-base font-booking_font4 text-dark family1">
                  {currentUser?.name}
                  <span className="block font-normal font-booking_font text-sm text-grey">
                    {currentUser?.email}
                  </span>
                </h4>
              )}
            </div>
          )}
          <ul className="flex flex-col w-full">
            {currentUser
              ? linkData?.slice(0, 6)?.map((x, index) => {
                  return (
                    <Link
                      to={`/${x.path}`}
                      key={index}
                      className="text-dark font-booking_font4
                        hover:bg-[rgba(0,0,0,.1)] py-[20px] border-b text-sm px-8"
                    >
                      {x.title}
                    </Link>
                  );
                })
              : linkData?.map((x, index) => {
                  return (
                    <Link
                      to={`/${x.path}`}
                      key={index}
                      className="text-dark font-booking_font4  hover:bg-[rgba(0,0,0,.1)] py-[20px] border-b text-sm px-8"
                    >
                      {x.title}
                    </Link>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
};

export const ProfileDropdownStyles = styled.div`
  .profile_wrapper:hover .profile_dropdown {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
  .profile_dropdown {
    width: 150px;
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
    &:hover {
      background: #eee;
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
`;

export default Navbar;
