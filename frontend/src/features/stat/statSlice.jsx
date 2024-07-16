import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAdminStat } from "./statReducer";
const initialState = {
  totalOrderAmount: 0,
  totalOrder: 0,
  totalReservations: 0,
  totalRooms: 0,
  getStatisLoading: false,
  getStatisSuccess: false,
  getStatisError: false,
  totalMonth: [],
  totalYear: [],
  totalStatAmount: [],
};

export const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAdminStat
    builder.addCase(getAdminStat.pending, (state, action) => {
      state.getStatisLoading = true;
    });
    builder.addCase(getAdminStat.fulfilled, (state, action) => {
      state.getStatisLoading = false;
      state.totalRooms = action.payload.totalRooms;
      state.totalReservations = action.payload.totalReservations;
      state.totalOrder = action.payload.totalOrder;
      state.totalOrderAmount = action.payload.totalOrderAmount;
      state.totalMonth = action.payload.finalStats.map(
        (data) => `${data?.date}`
      );
      state.totalStatAmount = action.payload.finalStats.map(
        (data) => data.count
      );
    });
    builder.addCase(getAdminStat.rejected, (state, action) => {
      state.getStatisLoading = false;
      toast.error(action.payload);
    });
  },
});

export default statSlice.reducer;
