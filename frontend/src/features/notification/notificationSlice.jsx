import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getAllNotifications,
  DeleteNotification,
  CreateNotifications,
  UpdateNotification
} from "./notificationReducer";
const initialState = {
  Notifications: [],
  Notification: null,
  creatingNotificationisLoading: false,
  creatingNotificationisSuccess: false,
  creatingNotificationisError: false,

  getallNotificationisLoading: false,
  getallNotificationisSuccess: false,
  getallNotificationisError: false,

  deleteNotificationisLoading: false,
  deleteNotificationisSuccess: false,
  deleteNotificationisError: false,

  updateNotificationisLoading: false,
  updateNotificationisSuccess: false,
  updateNotificationisError: false,

  getsingleNotificationisLoading: false,
  getsingleNotificationisSuccess: false,
  getsingleNotificationisError: false,
  page: 1,
  search: "",
  limit: "",
  noOfPages: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handlePage: (state, action) => {
      if (action.payload === "next") {
        state.page =
          state.page === state.noOfPages ? state.noOfPages : state.page + 1;
      }
      if (action.payload === "prev") {
        state.page = state.page === 1 ? 1 : state.page - 1;
      }
    },
    handleClearNotificationAlert: (state, action) => {
      state.deleteNotificationisLoading = false;
      state.deleteNotificationisSuccess = false;
      state.creatingNotificationisSuccess = false;
      state.updateNotificationisSuccess = false;
      state.Notification = null;
    },
  },
  extraReducers: (builder) => {
    // getAllNotifications
    builder.addCase(getAllNotifications.pending, (state, action) => {
      state.getallNotificationisLoading = true;
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      state.getallNotificationisSuccess = true;
      state.getallNotificationisLoading = false;
      state.Notifications = action.payload.notifications
    });
    builder.addCase(getAllNotifications.rejected, (state, action) => {
      state.getallNotificationisSuccess = false;
      toast.error(action.payload);
    });
    builder.addCase(CreateNotifications.pending, (state, action) => {
      state.creatingNotificationisLoading = true;
    });
    builder.addCase(CreateNotifications.fulfilled, (state, action) => {
      state.creatingNotificationisSuccess = true;
      state.creatingNotificationisLoading = false;
    });
    builder.addCase(CreateNotifications.rejected, (state, action) => {
      state.creatingNotificationisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(DeleteNotification.pending, (state, action) => {
      state.deleteNotificationisLoading = true;
    });
    builder.addCase(DeleteNotification.fulfilled, (state, action) => {
      state.deleteNotificationisSuccess = true;
      state.deleteNotificationisLoading = false;
      state.Notifications = state.Notifications.filter((Notification) => Notification.id !== action.payload);
      toast.success("Notification has been deleted");
    });
    builder.addCase(DeleteNotification.rejected, (state, action) => {
      state.deleteNotificationisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateNotification.pending, (state, action) => {
      state.updateNotificationisLoading = true;
    });
    builder.addCase(UpdateNotification.fulfilled, (state, action) => {
      state.updateNotificationisSuccess = true;
      state.updateNotificationisLoading = false;
      state.Notifications = state.Notifications.map((data) => {
        if (data?.id === action.payload.id) {
          return {
            ...data,
            read: action.payload.read
          }
        } else {
          return {
            ...data,
          }
        }
      })
      // toast.success("Notification has been updated");
    });
    builder.addCase(UpdateNotification.rejected, (state, action) => {
      state.updateNotificationisSuccess = false;
      toast.error(action.payload);
    });
  },
});

export const { handleClearNotificationAlert, handlePage } = notificationSlice.actions;

export default notificationSlice.reducer;
