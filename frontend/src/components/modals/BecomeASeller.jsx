
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import AnimateText from "@/animations/AnimateText";
import {
  onLoginModal,
  offRegisterModal,
  offLoginModal,
} from "../../features/modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { RegisterFormInputData } from "@/constants/data/formdata";
import { RegisterUser } from "@/features/auth/authReducer";

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
const BecomeASellerModal = () => {
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    dispatch(offRegisterModal());
  };

  const { registerisSuccess, registerisLoading } = useSelector(
    (store) => store.auth
  );
  const { sellermodal } = useSelector((store) => store.modal);
  const [formvalue, setFormValue] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginModal = () => {
    dispatch(offRegisterModal());
    dispatch(onLoginModal());
  };

  const handleFormSubmision = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formvalue));
  };

  useEffect(() => {
    if (registerisSuccess) {
      dispatch(offRegisterModal());
      dispatch(onLoginModal());
    }
  }, [registerisSuccess]);
  return (
    <RegisterModalStyles
      className="w-full h-screen"
      as={motion.div}
      initial={{ opacity: 0, visibility: "hidden" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
    >
      {registerisLoading && <Loader />}
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={sellermodal ? "enter" : "exit"}
        exit="exit"
        className="guestModalCard"
      >
        <div className="w-full mx-auto h-[550px] flex flex-col">
          <div className="w-full sticky top-0 left-0 p-8 px-8 border-b flex border-[rgba(0,0,0,.2)] items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-bold family1">
              Become a Seller
              <span className="block text-sm font-normal family1">
               Fill in the form to become a seller!
              </span>
            </h3>
            <div
              className="cross absolute top-2 right-3"
              onClick={handleClearAlert}
            >
              <RxCross2 />
            </div>
          </div>
          <div className="w-full overflow-auto h-[400px] justify-center pb-6 flex">
            <form
              onSubmit={handleFormSubmision}
              className="w-[90%] mx-auto p-4 md:px-8 pb-4 h-full justify-center flex flex-col gap-8"
            >
              <div className="grid grid-cols-2 gap-2 w-full">
                {RegisterFormInputData?.map((input, index) => {
                  return (
                    <label
                      key={index}
                      htmlFor={input.label}
                      className="text-sm family1 rounded-[10px] flex flex-col gap-2 text-dark"
                    >
                      <span className="text-dark ">{input.label}</span>
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

              <div className="w-full flex mt-4 items-center justify-center flex-col gap-3">
                <button
                  type="submit"
                  className="p-4 px-8 flex items-center justify-center w-full cursor-pointer btn btn-4 rounded-[40px] family1 font-bold text-white"
                >
                  <AnimateText children={"Become a Seller"} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </RegisterModalStyles>
  );
};
const RegisterModalStyles = styled(motion.div)`
  /* width: 100vw;
  height: 100vh; */
  position: fixed;
  left: 0;
  display: flex;
  z-index: 4000900;
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
    max-width: 600px;
    min-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    gap: 2rem;
    border-radius: 20px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 580px) {
      max-width: 95%;
      min-width: 95%;
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
        font-size: 1.3rem;
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

export default BecomeASellerModal;
