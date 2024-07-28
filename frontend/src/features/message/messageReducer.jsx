import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const messageurl = `${import.meta.env.VITE_API_BASE_URLS}/message`;


export const getAllmessage = createAsyncThunk(
  "getAllmessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(messageurl);
      localStorage.setItem("message", JSON.stringify(response.data.message));
      return response.data.message;
    } catch (err) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);


// Create User message
export const Createmessage = createAsyncThunk(
  "Createmessage",
  async ({ messageData, conversationId }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };

      const response2 = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${conversationId}`,
        messageData,
        config
      );
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationId
        }`,
        config
      );
      return response.data.messages;

      // console.log(messageData)
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);

// Deelete User message
export const Deletemessage = createAsyncThunk(
  "deletemessage",
  async (messageId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      // console.log(auth.token)
      // console.log(messagedata?._id)
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${messageId}`,
        config
      );
      return messageId;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);


// Getmessage Details
export const GetSinglemessageDetails = createAsyncThunk(
  "GetSinglemessageTweetDetails",
  async (conversationId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${conversationId}`,
        config
      );

      return response.data.messages;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);

// Get User message
export const GetUsermessage = createAsyncThunk(
  "GetUsermessage",
  async (messageId, { rejectWithValue, getState }) => {

    try {
      const { auth } = getState() 

      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/message/user/${messageId}`,
        config
      );
      return response.data.message;
      // console.log(messageId)

    } catch (err) {
      const message = err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      return rejectWithValue(message);

    }
  }
);