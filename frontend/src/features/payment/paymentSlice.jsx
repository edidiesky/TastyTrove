import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  CreatePayment,
  GetPaymentHistory,
  GetSinglePaymentHistory,
  UpdatePaymentToSuccess,
  UpdatePaymentToFailed,
} from "./paymentReducer";
const initialState = {
  payment: null,
  updatedReservation:null,
  payments: [],
  alertText: "",
  showAlert: false,
  alertType: "",
  getpaymentisLoading: false,
  getpaymentisSuccess: false,
  getpaymentisError: false,

  createpaymentisLoading: false,
  createpaymentisSuccess: false,
  createpaymentisError: false,

  updatepaymentisLoading: false,
  updatepaymentisSuccess: false,
  updatepaymentisError: false,
};

export const reservationSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    handleClearPayment: (state, action) => {
      state.payment = null;
    },
    handleClearPaymentAlert: (state, action) => {
      state.createpaymentisSuccess = false;
      state.updatepaymentisSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreatePayment.pending, (state, action) => {
      state.createpaymentisLoading = true;
    });
    builder.addCase(CreatePayment.fulfilled, (state, action) => {
      state.createpaymentisLoading = false;
      state.createpaymentisSuccess = true;
      state.payment = action.payload;
    });
    builder.addCase(CreatePayment.rejected, (state, action) => {
      state.createpaymentisSuccess = false;
      state.createpaymentisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(GetPaymentHistory.pending, (state, action) => {
      state.getpaymentisLoading = true;
    });
    builder.addCase(GetPaymentHistory.fulfilled, (state, action) => {
      state.getpaymentisLoading = false;
      state.getpaymentisSuccess = true;
      state.payments = action.payload;
    });
    builder.addCase(GetPaymentHistory.rejected, (state, action) => {
      state.getpaymentisSuccess = false;
      state.getpaymentisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(GetSinglePaymentHistory.pending, (state, action) => {
      state.getpaymentisLoading = true;
    });
    builder.addCase(GetSinglePaymentHistory.fulfilled, (state, action) => {
      state.getpaymentisLoading = false;
      state.getpaymentisSuccess = true;
      state.payment = action.payload;
    });
    builder.addCase(GetSinglePaymentHistory.rejected, (state, action) => {
      state.getpaymentisSuccess = false;
      state.getpaymentisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdatePaymentToSuccess.pending, (state, action) => {
      state.updatepaymentisLoading = true;
    });
    builder.addCase(UpdatePaymentToSuccess.fulfilled, (state, action) => {
      state.updatepaymentisLoading = false;
      state.updatepaymentisSuccess = true;
      state.payment = action.payload.payment;
      state.updatedReservation = action.payload.updatedReservation;
      // toast.success("Payment Details has been updated to success");
    });
    builder.addCase(UpdatePaymentToSuccess.rejected, (state, action) => {
      state.updatepaymentisSuccess = false;
      state.updatepaymentisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdatePaymentToFailed.pending, (state, action) => {
      state.updatepaymentisLoading = true;
    });
    builder.addCase(UpdatePaymentToFailed.fulfilled, (state, action) => {
      state.updatepaymentisLoading = false;
      state.updatepaymentisSuccess = true;
      state.payment = action.payload;
    });
    builder.addCase(UpdatePaymentToFailed.rejected, (state, action) => {
      state.updatepaymentisSuccess = false;
      state.updatepaymentisLoading = false;
      toast.error(action.payload);
    });
  },
});
export const { handleClearPayment,handleClearPaymentAlert } = reservationSlice.actions;
export default reservationSlice.reducer;
