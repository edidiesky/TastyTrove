"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllRooms = createAsyncThunk(
  "getAllRooms",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/room`
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

export const getAllRoomsForAdmin = createAsyncThunk(
  "getAllRoomsForAdmin",
  async (name, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().room;
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/room/admin`;
      if (page) {
        roomUrl = roomUrl + `?page=${page}`;
        const { data } = await axios.get(roomUrl);
        return data;
      } else if (search) {
        roomUrl = roomUrl + `?search=${search}`;
        const { data } = await axios.get(roomUrl);
        return data;
      } else {
        const { data } = await axios.get(roomUrl);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const getSingleRooms = createAsyncThunk(
  "getSingleRooms",
  async (roomid, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${roomid}`
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
export const DeleteRoom = createAsyncThunk(
  "DeleteRoom",
  async (roomdataid, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${roomdataid}`,
        config
      );

      return roomdataid;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const CreateRoom = createAsyncThunk(
  "CreateRoom",
  async (roomdata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/room`,
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
export const UpdateRoom = createAsyncThunk(
  "UpdateRoom",
  async (roomdata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${state?.room?.room?.id}`,
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
