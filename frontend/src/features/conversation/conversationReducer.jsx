import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// Create User conversation
export const Createconversation = createAsyncThunk(
  "Createconversation",
  async (conversationData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation`,
        { userId: conversationData },
        config
      );
      return response.data.conversation;

      // console.log(conversationData)
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);

// Deelete User conversation
export const Deleteconversation = createAsyncThunk(
  "deleteconversation",
  async (conversationId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      // console.log(auth.token)
      // console.log(conversationdata?._id)
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation/${conversationId}`,
        config
      );
      return conversationId;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);


// Get User conversation
export const GetUsersMessageConversation = createAsyncThunk(
  "GetUserconversation",
  async (receiverId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation/${receiverId}`,
        config
      );
      return response.data?.conversation;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);