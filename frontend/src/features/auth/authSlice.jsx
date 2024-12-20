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
  BecomingASeller,
  LogoutUser,
} from "./authReducer";
const customerData = JSON.parse(localStorage.getItem("customer"));
const shippingInformationData = JSON.parse(
  localStorage.getItem("shippingInformation")
);
// const customerToken = localStorage.getItem("customertoken");
const initialState = {
  users: [],
  token: "",
  currentUser: customerData ? customerData : null,
  userInfo: null,
  shippingInformation: shippingInformationData ? shippingInformationData : null,
  alertText: "",
  showAlert: false,
  alertType: "",
  loginisLoading: false,
  loginisSuccess: false,
  becomeASellerisLoading: false,
  becomeASellerisSuccess: false,

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
  limit: "",
  page: 1,

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
      state.loginisLoading = false;
      state.loginisSuccess = false;
      state.registerisLoading = false;
      state.registerisSuccess = false;
      state.updateUserisLoading = false;
      state.updateUserisSuccess = false;
    },
    ClearUserInfo: (state, action) => {
      localStorage.removeItem("customer");
      state.currentUser = null;
    },
    SaveShippingInformation: (state, action) => {
      localStorage.setItem(
        "shippingInformation",
        JSON.stringify(action.payload)
      );
      state.shippingInformation = action.payload;
      toast.success("Shipping Information has been saved sucessfully!!!!");
    },
    handlePage: (state, action) => {
      if (action.payload === "next") {
        state.page =
          state.page === state.noOfPages ? state.noOfPages : state.page + 1;
      }
      if (action.payload === "prev") {
        state.page = state.page === 1 ? 1 : state.page - 1;
      }
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
      toast.success("Login process sucessfully!!!!");
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loginisSuccess = false;
      state.loginisLoading = false;
      toast.error(action.payload);
    });
    // LogoutUser
    builder.addCase(LogoutUser.pending, (state, action) => {
      state.loginisLoading = true;
    });
    builder.addCase(LogoutUser.fulfilled, (state, action) => {
      state.loginisLoading = false;
      state.loginisSuccess = true;
      state.currentUser = null;
    });
    builder.addCase(LogoutUser.rejected, (state, action) => {
      state.loginisSuccess = false;
      state.loginisLoading = false;
      toast.error(action.payload);
    });
    builder.addCase(BecomingASeller.pending, (state, action) => {
      state.becomeASellerisLoading = true;
    });
    builder.addCase(BecomingASeller.fulfilled, (state, action) => {
      state.becomeASellerisLoading = false;
      state.becomeASellerisSuccess = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      toast.success("BecomingASeller process sucessfully!!!!");
    });
    builder.addCase(BecomingASeller.rejected, (state, action) => {
      state.becomeASellerisSuccess = false;
      state.becomeASellerisLoading = false;
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
      state.noOfPages = action.payload.noOfPages;
      // noOfPages
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

export const { handleClearUserAlert,handlePage, ClearUserInfo, SaveShippingInformation } =
  authSlice.actions;

export default authSlice.reducer;
