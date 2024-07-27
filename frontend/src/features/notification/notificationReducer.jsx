
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllNotifications = createAsyncThunk(
  "getAllNotifications",
  async (name, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().notification;
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/notification/admin`;
      // if (page) {
      //   roomUrl = roomUrl + `?page=${page}`;
      //   const { data } = await axios.get(roomUrl, config);
      //   return data;
      // } else if (search) {
      //   roomUrl = roomUrl + `?search=${search}`;
      //   const { data } = await axios.get(roomUrl, config);
      //   return data;
      // } else {
      //   const { data } = await axios.get(roomUrl, config);
      //   return data;
      // }
      const { data } = await axios.get(roomUrl, config);
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
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/notification/admin/${notificationid}`,
        config
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
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/notification`,
        roomdata,
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
export const UpdateNotification = createAsyncThunk(
  "UpdateNotification",
  async (notification, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/notification/admin/${notification?.id}`,
        {
          read: notification?.read
        },
        config
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
