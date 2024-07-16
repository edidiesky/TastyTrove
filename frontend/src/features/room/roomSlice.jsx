import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getAllRooms,
  getSingleRooms,
  DeleteRoom,
  CreateRoom,
  UpdateRoom,
  getAllRoomsForAdmin,
} from "./roomReducer";
const initialState = {
  rooms: [],
  room: null,
  creatingRoomisLoading: false,
  creatingRoomisSuccess: false,
  creatingRoomisError: false,

  getallRoomisLoading: false,
  getallRoomisSuccess: false,
  getallRoomisError: false,

  deleteRoomisLoading: false,
  deleteRoomisSuccess: false,
  deleteRoomisError: false,

  updateRoomisLoading: false,
  updateRoomisSuccess: false,
  updateRoomisError: false,

  getsingleRoomisLoading: false,
  getsingleRoomisSuccess: false,
  getsingleRoomisError: false,
  page: 1,
  search: "",
  limit: "",
  noOfPages: 0,
};

export const roomSlice = createSlice({
  name: "room",
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
    handleClearRoomAlert: (state, action) => {
      state.deleteRoomisLoading = false;
      state.deleteRoomisSuccess = false;
      state.creatingRoomisSuccess = false;
      state.updateRoomisSuccess = false;
      state.room = null;
    },
  },
  extraReducers: (builder) => {
    // getAllRoomsForAdmin
    builder.addCase(getAllRoomsForAdmin.pending, (state, action) => {
      state.getallRoomisLoading = true;
    });
    builder.addCase(getAllRoomsForAdmin.fulfilled, (state, action) => {
      state.getallRoomisLoading = false;
      state.rooms = action.payload.rooms;
      state.noOfPages = action.payload.noOfPages;
    });
    builder.addCase(getAllRoomsForAdmin.rejected, (state, action) => {
      state.getallRoomisSuccess = false;
      state.getallRoomisLoading = false;
      // toast.error(action.payload);
    });

    builder.addCase(getAllRooms.pending, (state, action) => {
      state.getallRoomisLoading = true;
    });
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.getallRoomisLoading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getAllRooms.rejected, (state, action) => {
      state.getallRoomisSuccess = false;
      state.getallRoomisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(getSingleRooms.pending, (state, action) => {
      state.getsingleRoomisLoading = true;
    });
    builder.addCase(getSingleRooms.fulfilled, (state, action) => {
      state.getsingleRoomisLoading = false;
      state.room = action.payload;
    });
    builder.addCase(getSingleRooms.rejected, (state, action) => {
      state.getsingleRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(CreateRoom.pending, (state, action) => {
      state.creatingRoomisLoading = true;
    });
    builder.addCase(CreateRoom.fulfilled, (state, action) => {
      state.creatingRoomisSuccess = true;
      state.creatingRoomisLoading = false;
      toast.success("Room has been created succesfully");
    });
    builder.addCase(CreateRoom.rejected, (state, action) => {
      state.creatingRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(DeleteRoom.pending, (state, action) => {
      state.deleteRoomisLoading = true;
    });
    builder.addCase(DeleteRoom.fulfilled, (state, action) => {
      state.deleteRoomisSuccess = true;
      state.deleteRoomisLoading = false;
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      toast.success("Room has been deleted");
    });
    builder.addCase(DeleteRoom.rejected, (state, action) => {
      state.deleteRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateRoom.pending, (state, action) => {
      state.updateRoomisLoading = true;
    });
    builder.addCase(UpdateRoom.fulfilled, (state, action) => {
      state.updateRoomisSuccess = true;
      state.updateRoomisLoading = false;
      toast.success("Room has been updated");
    });
    builder.addCase(UpdateRoom.rejected, (state, action) => {
      state.updateRoomisSuccess = false;
      toast.error(action.payload);
    });
  },
});

export const { handleClearRoomAlert, handlePage } = roomSlice.actions;

export default roomSlice.reducer;
