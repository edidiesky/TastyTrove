"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import Loader from "../home/loader";
import { LoginFormInputData } from "@/constants/data/formdata";
import {
  offLoginModal,
  offRegisterModal,
  onRegisterModal,
} from "../../features/modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/features/auth/authReducer";
import AnimateText from "@/animations/AnimateText";

const ModalVariants = {
  initial: {
    opacity: 0,
    y: "100vh",
  },
  enter: {
    opacity: 1,
    y: "0",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 1,
    y: "100vh",

    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
const LoginModal = () => {
  const dispatch = useDispatch();

  const { loginisSuccess, loginisLoading } = useSelector((store) => store.auth);
  const { loginmodal } = useSelector((store) => store.modal);
  const handleClearAlert = () => {
    dispatch(offLoginModal());
  };
  const [formvalue, setFormValue] = useState({
    email: "",
    hashedPassword: "",
  });

  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginModal = () => {
    dispatch(offLoginModal());
    dispatch(onRegisterModal());
  };
  const handleFormSubmision = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formvalue));
  };

  useEffect(() => {
    if (loginisSuccess) {
      dispatch(offLoginModal());
    }
  }, [loginisSuccess]);
  return (
    <LoginModalStyles
      as={motion.div}
      initial={{ opacity: 0, visibility: "hidden" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
    >
      {loginisLoading && <Loader />}
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={loginmodal ? "enter" : "exit"}
        exit="exit"
        className="guestModalCard"
      >
        <div className="w-full mx-auto overflow-hidden flex flex-col">
          <div className="w-full sticky top-0 left-0 p-6 px-8 border-b flex border-[rgba(0,0,0,.2)] items-center justify-between">
            <h3 className="text-3xl font-booking_font4">
              Sign In
              <span className="block text-sm font-normal font-booking_font">
                Login to your account and check out your bookings
              </span>
            </h3>
            <div className="cross" onClick={handleClearAlert}>
              <RxCross2 />
            </div>
          </div>
          <div className="w-full overflow-auto h-[350px]  flex">
            <form
              onSubmit={handleFormSubmision}
              className="w-[90%] mx-auto p-4 md:px-8 pb-8 flex flex-col gap-6"
            >
              <div className="w-full flex flex-col gap-2">
                {LoginFormInputData?.map((input, index) => {
                  return (
                    <label
                      key={index}
                      htmlFor={input.label}
                      className="text-sm font-booking_font rounded-[10px] flex flex-col gap-2 text-dark"
                    >
                      <span className="text-dark">{input.label}</span>
                      <input
                        className="w-full input rounded-2xl text-dark
                           font-normal text-sm"
                        required={true}
                        name={input?.name}
                        id={input.label}
                        value={formvalue[input.name]}
                        type={input.type}
                        placeholder={input.label}
                        onChange={handleFormChange}
                      ></input>
                    </label>
                  );
                })}
              </div>
              <div className="w-full flex items-center justify-center flex-col gap-3">
                <button
                  type="submit"
                  className="p-4 px-8 text-base flex items-center justify-center w-full cursor-pointer 
                  btn bg-[#000] rounded-[40px] font-booking_font_bold text-white"
                >
                  <AnimateText children={"Sign In"} />
                </button>
                <div className="w-full flex items-center justify-start gap-2">
                  <span className="text-sm font-normal text-dark">
                    Not yet a Member?{" "}
                    <span
                      onClick={handleLoginModal}
                      style={{ textDecoration: "underline" }}
                      className="font-booking_font_bold cursor-pointer"
                      // href={"#"}
                    >
                      Sign Up
                    </span>
                  </span>
                </div>
              </div>

              <div className="option text-dark">Or sign in with Google</div>

              <div
                // onClick={() => signIn("google")}
                className="p-4 px-8 items-center flex justify-center gap-4
                 w-full cursor-pointer btn text-[#fff] rounded-[40px] font-booking_font_bold"
              >
                <FcGoogle fontSize={"24px"} />
                <AnimateText children={"Continue with Google"} />
              </div>

              {/* <div className="p-4 px-8 items-center flex justify-center gap-4 w-full cursor-pointer btn text-[#000] rounded-[10px] font-booking_font font-normal border border-[rgba(0,0,0,.9)]">
                <FaGithub fontSize={"28px"} />
                Continue with Github
              </div> */}
            </form>
          </div>
        </div>
      </motion.div>
    </LoginModalStyles>
  );
};
const LoginModalStyles = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 4900;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  .option {
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0 1.4rem;
    font-size: 15px;
    &::after {
      width: 45%;
      height: 0.2px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      width: 45%;
      height: 0.4px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .guestModalCard {
    max-width: 400px;
    min-width: 540px;
    display: flex;
    height: 500px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    gap: 2rem;
    border-radius: 20px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 580px) {
      max-width: 90%;
      min-width: 90%;
    }
    .cross {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #d9d8d8;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2rem;
      gap: 1rem;
      button {
        padding: 1.2rem 2rem;
        border: none;
        /* font-size: 1.4rem; */
        font-weight: 400;
        background: var(--grey-2);
        color: #fff;
        outline: none;
        border-radius: 40px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: var(--grey-1);
          color: var(--text-color);
        }
        &.deleteBtn {
          background: var(--blue-1);
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
  }
`;

export default LoginModal;
