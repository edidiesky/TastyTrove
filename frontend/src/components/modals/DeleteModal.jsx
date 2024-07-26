"use client";
import React, { useState, useCallback, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { DeleteSingleUser } from "@/features/auth/authReducer";
import { handleClearUserAlert } from "@/features/auth/authSlice";
import { handleClearMenuAlert } from "@/features/menu/menuSlice";
import { DeleteMenu } from "@/features/menu/menuReducer";
import { DeleteSingleCart, GetSingleCart } from "@/features/cart/cartReducer";
import { clearCartAlert } from "@/features/cart/cartSlice";
export default function DeleteModal({ type, modal, setModal, menu, id }) {
  const { deleteRoomisLoading, deleteRoomisSuccess } = useSelector(
    (store) => store.menu
  );

  const { deleteCartisLoading, cartDetails, deleteCartisSuccess } = useSelector(
    (store) => store.cart
  );
  const { deleteUserisLoading, deleteUserisSuccess } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    setModal(false);
  };
  const handleDeleteMenu = useCallback(() => {
    dispatch(DeleteMenu(menu?.id));
  }, []);
  const handleDeleteCart = useCallback(() => {
    dispatch(DeleteSingleCart(menu?.id));
  }, []);
  const handleDeleteUser = useCallback(() => {
    // console.log(id)
    dispatch(DeleteSingleUser(id));
  }, []);

  // get singleCart
  useEffect(() => {
    if (id) {
      dispatch(GetSingleCart(id));
    }
  }, [id]);
  // console.log(menu);
  useEffect(() => {
    dispatch(handleClearMenuAlert());
    dispatch(handleClearUserAlert());
    if (deleteRoomisSuccess || deleteUserisSuccess || deleteCartisSuccess) {
      setModal(false);
      dispatch(handleClearMenuAlert());
      dispatch(handleClearUserAlert());
      dispatch(clearCartAlert());
    }
  }, [setModal, deleteRoomisSuccess, deleteUserisSuccess, deleteCartisSuccess]);

  if (type === "menu") {
    return (
      <DeleteContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {deleteCartisLoading && <Loader />}
        <motion.div
          initial={{
            y: "100vh",
          }}
          animate={{
            y: "0",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            y: "100vh",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
          className={"deleteCard"}
        >
          <div className="cross" onClick={handleClearAlert}>
            <RxCross2 />
          </div>
          <div className="w-full p-8 px-4 flex items-center justify-center flex-col gap-2">
            <span className="w-full flex items-center justify-center">
              <CiWarning fontSize={"55px"} color={"#c31212"} />
            </span>
            <h3 className="text-2xl font-bold text-center family1">
              <span
                className="family1 relative after:w-[100px] after:right-0 after:-bottom-0 after:h-[2px]
               after:bg-[#eee] after:rounded-lg font-bold after:absolute text-dark"
              >
                Delete {cartDetails?.menu?.title}?
              </span>

              <span className="block text-xs w-[80%] pt-2 mx-auto capitalize text-center family1">
                By deleting this menu, It cannot be retrieved back if
                this action you carry has been taken.
              </span>
            </h3>
          </div>

          <div className="deleteCardBottom py-3 w-full flex items-center justify-end px-4 border-t">
            <button
              className="family1 font-booking_font_bold flex items-center justify-center text-sm"
              onClick={handleClearAlert}
            >
              Cancel
            </button>
            <button
              disabled={deleteRoomisLoading}
              onClick={handleDeleteCart}
              className="deleteBtn family1 font-booking_font_bold flex items-center justify-center text-sm"
              // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {deleteRoomisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  Deleting in progress
                </span>
              ) : (
                " Delete Menu"
              )}
            </button>
          </div>
        </motion.div>
      </DeleteContainer>
    );
  }
  return (
    <DeleteContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{
          y: "100vh",
        }}
        animate={{
          y: "0",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        exit={{
          y: "100vh",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        className={"deleteCard"}
      >
        <div className="cross" onClick={handleClearAlert}>
          <RxCross2 />
        </div>
        <div className="w-full p-8 px-4 flex items-center justify-center flex-col gap-2">
          <span className="w-full flex items-center justify-center">
            <CiWarning fontSize={"45px"} color={"#c31212"} />
          </span>
          <h3 className="text-2xl font-bold text-center family1">
            <span>Delete this menu?</span>
            <span className="block pt-2 font-normal text-xs w-[80%] mx-auto capitalize text-center family1">
              By deleting this menu, It cannot be retrieved back if this
              action you carry has been taken.
            </span>
          </h3>
        </div>

        <div className="deleteCardBottom py-3 w-full flex items-center justify-end px-4 border-t">
          <button
            className="family1 font-booking_font_bold flex items-center justify-center text-sm"
            onClick={handleClearAlert}
          >
            Cancel
          </button>
          <button
            disabled={deleteRoomisLoading}
            onClick={handleDeleteMenu}
            className="deleteBtn family1 font-booking_font_bold flex items-center justify-center text-sm"
            // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
          >
            {deleteRoomisLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader type="dots" />
                Deleting in progress
              </span>
            ) : (
              " Delete Menu"
            )}
          </button>
        </div>
      </motion.div>
    </DeleteContainer>
  );
}

const DeleteContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 49000000;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  .deleteCard {
    max-width: 400px;
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 980px) {
      max-width: 350px;
      min-width: 350px;
    }
    @media (max-width: 480px) {
      max-width: 80%;
      min-width: 80%;
    }
    .cross {
      position: absolute;
      right: 20px;
      top: 5%;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
      svg {
        font-size: 16px;
      }
    }
    .deleteCardBottom {
      display: flex;
      gap: 1rem;
      button {
        padding: 0.5rem 1.6rem;
        min-height: 46px;
        border: none;
        font-weight: 500;
        background: #eee;
        color: #000;
        outline: none;
        border-radius: 10px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: #c4c4c4;
        }
        &.deleteBtn {
          background: var(--red);
          color: #fff;
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
    .deleteCardCenter {
      padding: 2rem 0;
      width: 100%;
      background: var(--grey-3);
      border-left: 5px solid var(--red);
      display: flex;
      align-items: center;
      svg {
        font-size: 15px;
        color: #c31212;
      }
    }

    .deleteCardTop {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`;
