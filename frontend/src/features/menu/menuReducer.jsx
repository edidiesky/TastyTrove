
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMenu = createAsyncThunk(
  "getAllMenu",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/menu`
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

export const getAllMenuForAdmin = createAsyncThunk(
  "getAllMenuForAdmin",
  async (name, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().menu;
      const state = thunkAPI.getState();
   
      let MenuUrl = `${import.meta.env.VITE_API_BASE_URLS}/menu/admin`;
      if (page) {
        MenuUrl = MenuUrl + `?page=${page}`;
        const { data } = await axios.get(MenuUrl, { withCredentials: true });
        return data;
      } else if (search) {
        MenuUrl = MenuUrl + `?search=${search}`;
        const { data } = await axios.get(MenuUrl, { withCredentials: true });
        return data;
      } else {
        const { data } = await axios.get(MenuUrl, { withCredentials: true });
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
export const getSingleMenu = createAsyncThunk(
  "getSingleMenu",
  async (Menuid, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/menu/${Menuid}`
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
export const DeleteMenu = createAsyncThunk(
  "DeleteMenu",
  async (Menudataid, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/menu/${Menudataid}`,
        { withCredentials: true }
      );

      return Menudataid;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const CreateMenu = createAsyncThunk(
  "CreateMenu",
  async (menudata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/menu`,
        menudata,
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
export const UpdateMenu = createAsyncThunk(
  "UpdateMenu",
  async (menudata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
   
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/menu/${state?.menu?.menu?.id}`,
        menudata,
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
