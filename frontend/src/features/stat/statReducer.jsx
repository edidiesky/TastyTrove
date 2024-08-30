
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminStat = createAsyncThunk(
  "getAdminStat",
  async (name, thunkAPI) => {
    try {
 
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/stat`,
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
