import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  GetSingleReservation,
  GetUserReservations,
  GetAllReservations,
  GetAllRoomAndReservations,
  DeleteReservation,
  UpdateReservation,
} from "./reservationReducer";
const initialState = {
  reservation: null,
  reservations: [],
  alertText: "",
  showAlert: false,
  alertType: "",
  loginisLoading: false,
  loginisSuccess: false,
  loginisError: false,

  getsingleReservationisLoading: false,
  getsingleReservationisSuccess: false,
  getsingleReservationisError: false,

  deleteReservationisLoading: false,
  deleteReservationisSuccess: false,
  deleteReservationisError: false,

  updateReservationisLoading: false,
  updateReservationisSuccess: false,
  updateReservationisError: false,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetSingleReservation.pending, (state, action) => {
      state.getsingleReservationisLoading = true;
    });
    builder.addCase(GetSingleReservation.fulfilled, (state, action) => {
      state.getsingleReservationisLoading = false;
      state.getsingleReservationisSuccess = true;
      state.reservation = action.payload;
    });
    builder.addCase(GetSingleReservation.rejected, (state, action) => {
      state.getsingleReservationisSuccess = false;
      toast.error(action.payload);
    });
    // GetAllReservations
    builder.addCase(GetUserReservations.pending, (state, action) => {
      state.getsingleReservationisLoading = true;
    });
    builder.addCase(GetUserReservations.fulfilled, (state, action) => {
      state.getsingleReservationisLoading = false;
      state.getsingleReservationisSuccess = true;
      state.reservations = action.payload;
    });
    builder.addCase(GetUserReservations.rejected, (state, action) => {
      state.getsingleReservationisSuccess = false;
      state.getsingleReservationisLoading = false;
      // toast.error(action.payload);
    });

    builder.addCase(GetAllReservations.pending, (state, action) => {
      state.getsingleReservationisLoading = true;
    });
    builder.addCase(GetAllReservations.fulfilled, (state, action) => {
      state.getsingleReservationisLoading = false;
      state.getsingleReservationisSuccess = true;
      state.reservations = action.payload;
    });
    builder.addCase(GetAllReservations.rejected, (state, action) => {
      state.getsingleReservationisSuccess = false;
      state.getsingleReservationisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(GetAllRoomAndReservations.pending, (state, action) => {
      state.getsingleReservationisLoading = true;
    });
    builder.addCase(GetAllRoomAndReservations.fulfilled, (state, action) => {
      state.getsingleReservationisLoading = false;
      state.getsingleReservationisSuccess = true;
      state.reservations = action.payload;
    });
    builder.addCase(GetAllRoomAndReservations.rejected, (state, action) => {
      state.getsingleReservationisSuccess = false;
      state.getsingleReservationisLoading = false;
      toast.error(action.payload);
    });
    // DeleteReservation

    // UpdateReservation
    builder.addCase(DeleteReservation.pending, (state, action) => {
      state.deleteReservationisLoading = true;
    });
    builder.addCase(DeleteReservation.fulfilled, (state, action) => {
      state.deleteReservationisSuccess = true;
      state.deleteReservationisLoading = false;
      state.reservations = state.reservations.filter(
        (Reservation) => Reservation.id !== action.payload
      );
      toast.success("reservations has been deleted");
    });
    builder.addCase(DeleteReservation.rejected, (state, action) => {
      state.deleteReservationisSuccess = false;
      state.deleteReservationisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateReservation.pending, (state, action) => {
      state.updateReservationisLoading = true;
    });
    builder.addCase(UpdateReservation.fulfilled, (state, action) => {
      state.updateReservationisSuccess = true;
      state.updateReservationisLoading = false;
      state.reservation = action.payload;
      toast.success("reservations has been updated");
    });
    builder.addCase(UpdateReservation.rejected, (state, action) => {
      state.updateReservationisSuccess = false;
      state.updateReservationisLoading = false;
      toast.error(action.payload);
    });
  },
});

export default reservationSlice.reducer;
