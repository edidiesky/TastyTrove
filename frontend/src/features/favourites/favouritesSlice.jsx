"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUserFavouriteRooms } from "./favouritesReducer";
const initialState = {
  savedRooms: [],
  alertText: "",
  showAlert: false,
  alertType: "",
  wishisLoading: false,
  wishisSuccess: false,
  wishisError: false,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    handleFavouritesRooms: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserFavouriteRooms.pending, (state, action) => {
      state.wishisLoading = true;
    });
    builder.addCase(GetUserFavouriteRooms.fulfilled, (state, action) => {
      state.wishisSuccess = true;
      state.wishisLoading = false;
      state.savedRooms = action.payload;
      //  toast.success(action.payload);
    });
    builder.addCase(GetUserFavouriteRooms.rejected, (state, action) => {
      state.wishisSuccess = false;
      state.wishisLoading = false;
      // toast.error(action.payload);
    });
  },
});

export const { handleFavouritesRooms } = favouritesSlice.actions;

export default favouritesSlice.reducer;
