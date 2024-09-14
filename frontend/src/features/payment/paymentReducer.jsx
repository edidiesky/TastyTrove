import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreatePayment = createAsyncThunk(
  "CreatePayment",
  async (paymentData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/payment`,
        paymentData,
        { withCredentials: true }
      );
      return data.paymentid;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const GetPaymentHistory = createAsyncThunk(
  "GetPaymentHistory",
  async (paymentData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/payment/history`,
        { withCredentials: true }
      );
      return data.payment;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const GetSinglePaymentHistory = createAsyncThunk(
  "GeSinglePaymentHistory",
  async (paymentDataId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URLS
        }/payment/history/${paymentDataId}`,
        { withCredentials: true }
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

export const UpdatePaymentToSuccess = createAsyncThunk(
  "UpdatePaymentToSuccess",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URLS
        }/payment/history/success/${id}`,
      null,
        { withCredentials: true }
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

export const UpdatePaymentToDelivered = createAsyncThunk(
  "UpdatePaymentToDelivered",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URLS
        }/payment/history/delivery/success/${id}`,
        null,
        { withCredentials: true }
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


export const UpdatePaymentToFailed = createAsyncThunk(
  "UpdatePaymentToFailed",
  async (paymentDataId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URLS
        }/payment/history/failed/${paymentDataId}`,
        null,
        { withCredentials: true }
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


