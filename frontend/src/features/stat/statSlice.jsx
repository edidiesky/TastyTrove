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
  topSaledProduct: [],
  recentSales: [],
  widgetData: null,
  totalMonthRevenue: [],
  totalMonthSalesAmount: [],
  totalMonth: [],
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
      state.recentSales = action.payload.recentsales;
      state.widgetData = action.payload.widgetData;
      state.topSaledProduct = action.payload.topproduct;

      state.totalMonth = action.payload?.orderHistory
        .map((data) => `${data?.date}`)
        .slice(0, 6);
      state.totalMonthSalesAmount = action.payload?.orderHistory
        .map((data) => data.salesAmount)
        .slice(0, 6);
      state.totalMonthRevenue = action.payload?.orderHistory
        .map((data) => Number(data.totalRevenue))
        .slice(0, 6);
    });
    builder.addCase(getAdminStat.rejected, (state, action) => {
      state.getStatisLoading = false;
      toast.error(action.payload);
    });
  },
});

export default statSlice.reducer;
