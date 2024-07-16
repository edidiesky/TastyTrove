import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  LoginUser,
  RegisterUser,
  GetAllUsers,
  DeleteSingleUser,
  UpdateSingleUser,
  addListToWish,
  GetSingleUser,
} from "./authReducer";
const customerData = JSON.parse(localStorage.getItem("customer"));
const customerToken = localStorage.getItem("customertoken");
const initialState = {
  users: [],
  token: customerToken ? customerToken : "",
  currentUser: customerData ? customerData : null,
  userInfo: null,
  alertText: "",
  showAlert: false,
  alertType: "",
  loginisLoading: false,
  loginisSuccess: false,
  loginisError: false,

  registerisLoading: false,
  registerisSuccess: false,
  registerisError: false,

  getallUserisLoading: false,
  getallUserisSuccess: false,
  getallUserisError: false,

  deleteUserisLoading: false,
  deleteUserisSuccess: false,
  deleteUserisError: false,

  updateUserisLoading: false,
  updateUserisSuccess: false,
  updateUserisError: false,
  noOfPages: 0,
  totalUser: 0,

  wishisLoading: false,
  wishisSuccess: false,
  wishisError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleClearUserAlert: (state, action) => {
      state.deleteUserisLoading = false;
      state.deleteUserisSuccess = false;
    },
    ClearUserInfo: (state, action) => {
      localStorage.removeItem("customertoken");
      localStorage.removeItem("customer");
      // state.isLoading = false;
      state.alertType = "";
      state.showAlert = false;
      state.alertText = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.loginisLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loginisLoading = false;
      state.loginisSuccess = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      toast.success("Login process sucessfully!!!!");
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loginisSuccess = false;
      state.loginisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(RegisterUser.pending, (state, action) => {
      state.registerisLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.registerisLoading = false;
      state.registerisSuccess = true;
      toast.success("registration process sucessfully!!!!");
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.registerisSuccess = false;
      state.registerisLoading = false;
      toast.error(action.payload);
    });
    // GetSingleUser
    builder.addCase(GetAllUsers.pending, (state, action) => {
      state.getallUserisLoading = true;
    });
    builder.addCase(GetAllUsers.fulfilled, (state, action) => {
      state.getallUserisLoading = false;
      state.getallUserisSuccess = true;
      state.users = action.payload.user;
      state.totalUser = action.payload.totalUser;
    });
    builder.addCase(GetAllUsers.rejected, (state, action) => {
      state.getallUserisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(GetSingleUser.pending, (state, action) => {
      state.getallUserisLoading = true;
    });
    builder.addCase(GetSingleUser.fulfilled, (state, action) => {
      state.getallUserisLoading = false;
      state.getallUserisSuccess = true;
      state.userInfo = action.payload.user;
    });
    builder.addCase(GetSingleUser.rejected, (state, action) => {
      state.getallUserisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(DeleteSingleUser.pending, (state, action) => {
      state.deleteUserisLoading = true;
    });
    builder.addCase(DeleteSingleUser.fulfilled, (state, action) => {
      state.deleteUserisLoading = false;
      state.deleteUserisSuccess = true;
      state.users = state.users.filter((user) => user?.id !== action.payload);
      toast.success("deleted user sucessfully!!!!");
    });
    builder.addCase(DeleteSingleUser.rejected, (state, action) => {
      state.deleteUserisSuccess = false;
      state.deleteUserisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateSingleUser.pending, (state, action) => {
      state.updateUserisLoading = true;
    });
    builder.addCase(UpdateSingleUser.fulfilled, (state, action) => {
      state.updateUserisLoading = false;
      state.updateUserisSuccess = true;
      toast.success("updated user sucessfully!!!!");
    });
    builder.addCase(UpdateSingleUser.rejected, (state, action) => {
      state.updateUserisSuccess = false;
      state.updateUserisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(addListToWish.pending, (state, action) => {
      state.wishisLoading = true;
    });
    builder.addCase(addListToWish.fulfilled, (state, action) => {
      state.wishisSuccess = true;
      state.wishisLoading = false;
      state.currentUser = action.payload.user;
      toast.success(action.payload.message);
    });
    builder.addCase(addListToWish.rejected, (state, action) => {
      state.wishisSuccess = false;
      toast.error(action.payload);
    });
  },
});

export const { handleClearUserAlert, ClearUserInfo } = authSlice.actions;

export default authSlice.reducer;
