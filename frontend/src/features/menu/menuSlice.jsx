import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getAllMenu,
  getSingleMenu,
  DeleteMenu,
  CreateMenu,
  UpdateMenu,
  getAllMenuForAdmin,
} from "./menuReducer";
const initialState = {
  menus: [],
  menu: null,
  creatingMenuisLoading: false,
  creatingMenuisSuccess: false,
  creatingMenuisError: false,

  getallMenuisLoading: false,
  getallMenuisSuccess: false,
  getallMenuisError: false,

  deleteMenuisLoading: false,
  deleteMenuisSuccess: false,
  deleteMenuisError: false,

  updateMenuisLoading: false,
  updateMenuisSuccess: false,
  updateMenuisError: false,

  getsingleMenuisLoading: false,
  getsingleMenuisSuccess: false,
  getsingleMenuisError: false,
  page: 1,
  search: "",
  limit: "",
  noOfPages: 0,
};

export const menuSlice = createSlice({
  name: "menu",
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
    handleClearMenuAlert: (state, action) => {
      state.deleteMenuisLoading = false;
      state.deleteMenuisSuccess = false;
      state.creatingMenuisSuccess = false;
      state.updateMenuisSuccess = false;
      state.menu = null;
    },
  },
  extraReducers: (builder) => {
    // getAllMenuForAdmin
    builder.addCase(getAllMenuForAdmin.pending, (state, action) => {
      state.getallMenuisLoading = true;
    });
    builder.addCase(getAllMenuForAdmin.fulfilled, (state, action) => {
      state.getallMenuisLoading = false;
      state.menus = action.payload.Menus;
      state.noOfPages = action.payload.noOfPages;
    });
    builder.addCase(getAllMenuForAdmin.rejected, (state, action) => {
      state.getallMenuisSuccess = false;
      state.getallMenuisLoading = false;
      // toast.error(action.payload);
    });

    builder.addCase(getAllMenu.pending, (state, action) => {
      state.getallMenuisLoading = true;
    });
    builder.addCase(getAllMenu.fulfilled, (state, action) => {
      state.getallMenuisLoading = false;
      state.menus = action.payload;
    });
    builder.addCase(getAllMenu.rejected, (state, action) => {
      state.getallMenuisSuccess = false;
      state.getallMenuisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(getSingleMenu.pending, (state, action) => {
      state.getsingleMenuisLoading = true;
    });
    builder.addCase(getSingleMenu.fulfilled, (state, action) => {
      state.getsingleMenuisLoading = false;
      state.menu = action.payload;
    });
    builder.addCase(getSingleMenu.rejected, (state, action) => {
      state.getsingleMenuisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(CreateMenu.pending, (state, action) => {
      state.creatingMenuisLoading = true;
    });
    builder.addCase(CreateMenu.fulfilled, (state, action) => {
      state.creatingMenuisSuccess = true;
      state.creatingMenuisLoading = false;
      toast.success("Menu has been created succesfully");
    });
    builder.addCase(CreateMenu.rejected, (state, action) => {
      state.creatingMenuisSuccess = false;
      state.creatingMenuisLoading = false;

      toast.error(action.payload);
    });

    builder.addCase(DeleteMenu.pending, (state, action) => {
      state.deleteMenuisLoading = true;
    });
    builder.addCase(DeleteMenu.fulfilled, (state, action) => {
      state.deleteMenuisSuccess = true;
      state.deleteMenuisLoading = false;
      state.menus = state.menus.filter((menu) => menu.id !== action.payload);
      toast.success("Menu has been deleted");
    });
    builder.addCase(DeleteMenu.rejected, (state, action) => {
      state.deleteMenuisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateMenu.pending, (state, action) => {
      state.updateMenuisLoading = true;
    });
    builder.addCase(UpdateMenu.fulfilled, (state, action) => {
      state.updateMenuisSuccess = true;
      state.updateMenuisLoading = false;
      toast.success("Menu has been updated");
    });
    builder.addCase(UpdateMenu.rejected, (state, action) => {
      state.updateMenuisSuccess = false;
      state.updateMenuisLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { handleClearMenuAlert, handlePage } = menuSlice.actions;

export default menuSlice.reducer;
