
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllNotifications = createAsyncThunk(
  "getAllNotifications",
  async (name, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().notification;
      const state = thunkAPI.getState();
   
      let URL = `${import.meta.env.VITE_API_BASE_URLS}/notification/admin`;

      const { data } = await axios.get(URL, { withCredentials: true });
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

export const DeleteNotification = createAsyncThunk(
  "DeleteNotification",
  async (notificationid, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/notification/admin/${notificationid}`,
        { withCredentials: true }
      );

      return notificationid;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const CreateNotifications = createAsyncThunk(
  "CreateNotifications",
  async (roomdata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/notification`,
        roomdata,
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
export const UpdateNotification = createAsyncThunk(
  "UpdateNotification",
  async (notification, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/notification/admin/${notification?.id}`,
        {
          read: notification?.read
        },
        { withCredentials: true }
      );
      // console.log(notification)
      return notification;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
