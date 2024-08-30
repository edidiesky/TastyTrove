import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// Create User conversation
export const Createconversation = createAsyncThunk(
  "Createconversation",
  async (conversationData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
  

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation`,
        { userId: conversationData },
          { withCredentials: true }
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

export const getAllSellerConversationUsers = createAsyncThunk(
  "getAllSellerConversationUsers",
  async (conversationData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
  

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation`,
          { withCredentials: true }
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
  
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation/${conversationId}`,
          { withCredentials: true }
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

  
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/conversation/${receiverId}`,
          { withCredentials: true }
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


export const UserConversationChat = createAsyncThunk(
  "UserConversationChat",
  async (receiverId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

  
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URLS
        }/conversation/chat?receiverId=${receiverId}`,
          { withCredentials: true }
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
