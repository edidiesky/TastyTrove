import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateReview = createAsyncThunk(
  "CreateReview",
  async (review, thunkAPI) => {
    try {
 
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/review`,
        review,
        { withCredentials: true }
      );
      // localStorage.setItem("customer", JSON.stringify(data.seller));
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

export const GetMenuReviews = createAsyncThunk(
  "GetMenuReview",
  async (menuid, thunkAPI) => {
    try {
 
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/review/history/${menuid}`,
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

export const GetReviewHistoryForAdmin = createAsyncThunk(
  "GetReviewHistoryForAdmin",
  async (menuid, thunkAPI) => {
    try {
 
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/review/seller-history`,
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
