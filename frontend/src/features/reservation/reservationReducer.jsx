"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleReservation = createAsyncThunk(
  "GetSingleReservation",
  async (reservationId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/reservation/${reservationId}`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
// GetAllRoomAndReservations
export const GetAllRoomAndReservations = createAsyncThunk(
  "GetAllRoomAndReservations",
  async (reservationId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/room/room-reservation-history`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const GetUserReservations = createAsyncThunk(
  "GetUserReservations",
  async (reservationId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/reservation/user`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const GetAllReservations = createAsyncThunk(
  "GetAllReservations",
  async (reservationId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/reservation/history`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);


export const DeleteReservation = createAsyncThunk(
  "DeleteReservation",
  async (reservationId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/reservation/${reservationId}`,
        config
      );
      return reservationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const UpdateReservation = createAsyncThunk(
  "UpdateReservation",
  async ({reservationId, reservation}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/reservation/${reservationId}`,
        reservation,
        config
      );
      return data.reservation;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);