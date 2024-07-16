"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  savedRooms: [],
  loginmodal: false,
  registermodal: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    onLoginModal: (state, action) => {
      state.loginmodal = true;
    },
    offLoginModal: (state, action) => {
      state.loginmodal = false;
    },

    onRegisterModal: (state, action) => {
      state.registermodal = true;
    },
    offRegisterModal: (state, action) => {
      state.registermodal = false;
    },
  },
});

export const { onLoginModal, offLoginModal, onRegisterModal, offRegisterModal } =
  modalSlice.actions;

export default modalSlice.reducer;
