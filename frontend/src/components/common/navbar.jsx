import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoBag } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AnimateText from "@/animations/AnimateText";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { onLoginModal, onSellerModal } from "@/features/modals/modalSlice";
import { GetUserCart } from "@/features/cart/cartReducer";
import { LayoutDashboard, LogOut } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import Button from "./Button";
import { LogoutUser } from "@/features/auth/authReducer";
const linkData = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Menu",
    path: "restaurant/menu",
  },
  // {
  //   title: "History",
  //   path: "restaurant/menu",
  // },
  // {
  //   title: "Bulletin",
  //   path: "restaurant/menu",
  // },
  {
    title: "Reservations",
    path: "restaurant/reservations",
  },
  {
    title: "Team",
    path: "restaurant/team",
  },
];

const Navbar = () => {
  const [bar, setBar] = React.useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const { payment, payments } = useSelector((store) => store.payment);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LogoutUser());
    dispatch(ClearUserInfo());

    // window.location.reload();
  };
  useEffect(() => {
    // fetch the user cart if the user exists
    if (currentUser) {
      dispatch(GetUserCart());
    }
  }, [payments]);
  return (
    <>
      <div className="py-12 z-[50] relative flex items-center justify-center">
        <div className="bg-[#000] z-10 h-full absolute top-0 w-full"></div>
        <div className="w-90 auto md:px-8 flex z-[30] items-center gap-12 justify-between">
          <Link to={"/"} className=" flex items-center gap-1 justify-start">
            <h3 className="text-3xl hidden md:block md:text-4xl text-white family3">
              <AnimateText children={"TastyTrove Restaurant"} />
            </h3>
            <h3 className="text-3xl block md:hidden md:text-4xl text-white family3">
              <AnimateText children={"TastyTrove"} />
            </h3>
          </Link>

          {/* <img src="/images/TestLogo.png" alt="" className="w-40" /> */}

          <div className="hidden lg:flex items-center justify-center gap-3">
            <div className="items-center justify-end flex gap-4">
              {linkData?.map((list, index) => {
                return (
                  <NavLink
                    end
                    to={`/${list.path}`}
                    key={index}
                    style={{ letterSpacing: "2px" }}
                    className={`text-base tab md:text-base hover:text-grey family1 text-[var(--grey-1)] uppercase flex items-center gap-2 p-3 px-1 rounded-[40px]`}
                  >
                    {/* <img src={list?.icon} className="w-4" alt="" /> */}
                    <AnimateText children={list?.title} />
                  </NavLink>
                );
              })}
            </div>
            <NavLink
              end
              to={"/restaurant/cart"}
              className="w-12 tab relative rounded-full object-cover cursor-pointer
               hover:bg-[#18181885] text-[#fff] h-12 flex items-center justify-center text-xl"
            >
              <IoBag />
              {cart?.length !== 0 && (
                <div className="w-6 h-6 absolute bg-[var(--red)] -top-1 right-6 text-[#fff] text-xs rounded-full object-cover flex items-center justify-center">
                  {cart?.length}
                </div>
              )}
            </NavLink>
          </div>
          <div className="flex justify-end items-center gap-4">
            {!currentUser && (
              <button
                data-test="navbar_login_button"
                onClick={() => {
                  dispatch(onLoginModal());
                }}
                className="h-[48px] w-[110px] rounded-[40px] bg-[var(--primary)] overflow-hidden text-base"
              >
                <Button bgColor={"#fff"} text={"Sign Up"} />
              </button>
            )}
            {currentUser?.role !== "SELLER" &&
              currentUser?.role !== "ADMIN" && (
                <button
                  data-test="navbar_becomeASeller_button"
                  onClick={() => {
                    dispatch(onSellerModal());
                  }}
                  className="h-[48px] w-[110px] md:flex hidden rounded-[40px] overflow-hidden text-base"
                >
                  <Button
                    bgColor={"var(--primary)"}
                    text={"Sell Now"}
                    type={"white"}
                  />
                </button>
              )}
            <ProfileDropdownStyles className="z-[30000000000000] relative flex items-end justify-end gap-4">
              {/* <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full object-cover bg-[#000] flex items-center justify-center text-2xl text-white">
                <BiCart />
              </div> */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="flex profile_wrapper relative items-center justify-end gap-2">
                    <div className="profile_dropdown shadow absolute">
                      <div className="w-full flex flex-col">
                        <div className="p-4 border-b flex items-center gap-4">
                          {currentUser?.image ? (
                            <img
                              src={currentUser?.image}
                              alt=""
                              className="w-12 lg:w-14 h-12 lg:h-14 rounded-full object-cover"
                            />
                          ) : (
                            <img
                              src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                              alt=""
                              className="w-12 lg:w-14 h-12 lg:h-14 rounded-full object-cover"
                            />
                          )}
                          <h4 className="text-base text-dark font-bold family1">
                            {currentUser?.name}
                            <span className="block font-normal family1 text-xs text-dark">
                              {currentUser?.role === "SELLER"
                                ? "Seller"
                                : currentUser?.role === "ADMIN"
                                ? "Admin"
                                : "Personal"}{" "}
                              Account
                            </span>
                          </h4>
                        </div>
                        {currentUser?.role === "SELLER" ||
                        currentUser?.role === "ADMIN" ? (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            <Link
                              to={"/dashboard"}
                              className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                            >
                              Dashboard
                            </Link>
                            <Link
                              to={"/dashboard/settings"}
                              className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                            >
                              Profile
                            </Link>
                            <div
                              onClick={() => handleLogOut()}
                              className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                            >
                              Log Out
                            </div>
                          </div>
                        ) : currentUser?.email ? (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            {/* <Link
                              to={"/trips"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                            >
                              Orders
                            </Link>
                            <Link
                              to={"/savedhomes"}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                            >
                              Favourites
                            </Link> */}
                            <div
                              onClick={() => handleLogOut()}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                            >
                              Log Out
                            </div>
                          </div>
                        ) : (
                          <div className="flex profile_dropdown_bottom flex-col w-full">
                            <div
                              onClick={() => dispatch(onRegisterModal())}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                            >
                              Sign Up
                            </div>
                            <div
                              onClick={() => dispatch(onLoginModal())}
                              className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
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
                          className="w-12 lg:w-16 h-12 lg:h-16 rounded-full object-cover"
                        />
                      ) : currentUser?.username ? (
                        // <div className="w-12 h-12 text-white rounded-full object-cover bg-[#000] text-2xl flex items-center justify-center ">
                        //   {currentUser?.username[0]}{" "}
                        // </div>
                        <img
                          src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                          alt=""
                          className="w-10 lg:w-16 h-10 lg:h-16 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                          alt=""
                          className="w-10 lg:w-16 h-10 lg:h-16 rounded-full object-cover"
                        />
                      )}
                      {/* {currentUser && (
                        <h4 className="text-base hidden lg:block family1 text-[#fff] family1">
                          {currentUser?.username}
                          <span className="block font-normal family1 text-xs text-[var(--grey-1)]">
                            {currentUser?.email}
                          </span>
                        </h4>
                      )} */}
                    </div>
                  </div>
                  <span
                    onClick={() => setBar(true)}
                    className="flex text-3xl text-[#fff] lg:hidden"
                  >
                    <HiBars3BottomRight />
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-4">
                  {/* <div
                    onClick={() => dispatch(onLoginModal())}
                    className="btn text-xs text-center p-4 font-booking_font4 text-white px-6 rounded-[40px]"
                  >
                    <AnimateText children={" Book Your Stay"} />
                  </div> */}
                  <span
                    onClick={() => setBar(true)}
                    className="flex text-4xl cursor-pointer text-[#fff] lg:hidden"
                  >
                    <HiBars3BottomRight />
                  </span>
                </span>
              )}
            </ProfileDropdownStyles>
          </div>
        </div>
      </div>
      <Sidebar bar={bar} setBar={setBar} />
    </>
  );
};

const Sidebar = ({ bar, setBar }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const { payment, payments, updatepaymentisLoading } = useSelector(
    (store) => store.payment
  );

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LogoutUser());
    dispatch(ClearUserInfo());

    window.location.reload();
  };
  return (
    <div
      style={{ zIndex: "400000" }}
      className={`${
        bar ? "left-0" : "-left-[100%]"
      } w-[280px]  sm:w-[300px] h-full transition-all ease duration-700 fixed 
        flex lg:hidden top-0 bg-[#fff] shadow-2xl column gap-2`}
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
        className="w-full Header_wrapper relative h-full bg-white flex item-center flex-col gap-4"
      >
        <div className="gradient2 absolute"></div>
        <img
          src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
          alt=""
          className="absolute w-full h-full object-cover"
        />
        {currentUser && (
          <div className="flex p-4 items-center gap-2">
            {currentUser?.image ? (
              <img
                src={currentUser?.image}
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full object-cover"
              />
            ) : currentUser?.username ? (
              // <div className="w-12 h-12 text-white rounded-full object-cover bg-[#000] text-2xl flex items-center justify-center ">
              //   {currentUser?.username[0]}{" "}
              // </div>
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full object-cover"
              />
            ) : (
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full object-cover"
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
        <Link
          to={"/"}
          className="py-8 flex z-[2000000] px-4 items-center gap-1 justify-start"
        >
          <h3 className="text-3xl text-white family3">
            <AnimateText children={"TastyTrove Restaurant"} />
          </h3>
        </Link>
        <ul className="flex z-[400000] flex-col w-full">
          {currentUser
            ? linkData?.slice(0, 6)?.map((x, index) => {
                return (
                  <Link
                    to={`/${x.path}`}
                    key={index}
                    className="text-dark 
                        hover:bg-[rgba(0,0,0,.3)] tab py-[20px] border-b border-[rgba(255,255,255,.1)] text-lg family1 text-[#fff] px-8"
                  >
                    <AnimateText children={x.title} />
                  </Link>
                );
              })
            : linkData?.map((x, index) => {
                return (
                  <Link
                    to={`/${x.path}`}
                    key={index}
                    className="text-dark tab hover:bg-[rgba(0,0,0,.3)] border-b border-[rgba(255,255,255,.1)] py-[20px]  text-lg family1 text-[#fff] px-8"
                  >
                    <AnimateText children={x.title} />
                  </Link>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export const ProfileDropdownStyles = styled.div`
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
    /* z-index: 400000000000; */
    background: #fff;
    top: 100%;
    right: 20%;
    border-radius: 10px;
    .profile_card {
      padding: 1.3rem 1.5rem;

      cursor: pointer;
    }
  }
  .profile_list {
    padding: 14px 2rem;
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
  .tab {
    &.active {
      position: relative;
      background: #fff;
      color: #000;

      span {
        svg {
          color: #fff;
        }
      }
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
