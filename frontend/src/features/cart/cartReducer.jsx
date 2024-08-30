
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleCart = createAsyncThunk(
  "GetSingleCart",
  async (CartId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/${CartId}`,
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
// GetAllRoomAndCart
export const GetAllRoomAndCart = createAsyncThunk(
  "GetAllRoomAndCart",
  async (CartId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/room/room-cart-history`,
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
export const GetUserCart = createAsyncThunk(
  "GetUserCart",
  async (CartId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/user`,
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

export const GetAllCart = createAsyncThunk(
  "GetAllCart",
  async (CartId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/history`,
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

export const DeleteSingleCart = createAsyncThunk(
  "DeleteSingleCart",
  async (CartId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/${CartId}`,
        { withCredentials: true }
      );
      return CartId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const UpdateCart = createAsyncThunk(
  "UpdateCart",
  async ({CartId, cart}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/${CartId}`,
        cart,
        { withCredentials: true }
      );
      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const CreateCart = createAsyncThunk(
  "CreateCart",
  async ({ roomId, cart }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/${roomId}`,
        cart,
        { withCredentials: true }
      );
      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);