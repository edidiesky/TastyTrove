import { createSlice } from "@reduxjs/toolkit";
import {
  Createconversation,
  Deleteconversation,
  GetUsersMessageConversation,
  getAllSellerConversationUsers,
  UserConversationChat,
} from "./conversationReducer";
import toast from "react-hot-toast";
const conversation = JSON.parse(
  localStorage.getItem("conversation") || "false"
);

// Define the initial state of the conversation using that type
const initialState = {
  conversationDetails: null,
  userconversationDetails: null,

  conversation: [],
  usersInconversation: [],

  getUsersInConversationisLoading: false,
  getUsersInConversationisSuccess: false,

  conversationisLoading: false,
  conversationisSuccess: false,
  conversationisError: false,
  alertText: "",
  showAlert: false,
  alertType: "",
};

export const conversationSlice = createSlice({
  name: "conversation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearconversation: (state, action) => {
      state.conversationDetails = null;
      state.conversation = [];
      state.conversationisLoading = false;
      state.isBookMarked = false;
      state.conversationisSuccess = false;
      state.conversationisError = false;
      state.alertText = "";
      state.showAlert = false;
      state.alertType = "";
    },
  },
  extraReducers: (builder) => {
    // // registration build case
    builder.addCase(GetUsersMessageConversation.pending, (state, action) => {
      state.conversationisLoading = true;
    });
    builder.addCase(GetUsersMessageConversation.fulfilled, (state, action) => {
      state.conversationisSuccess = true;
      state.conversationisLoading = false;
      state.conversationDetails = action.payload;
    });
    builder.addCase(GetUsersMessageConversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      // toast.error(action.payload);
    });
    // UserConversationChat
    builder.addCase(UserConversationChat.pending, (state, action) => {
      state.conversationisLoading = true;
    });
    builder.addCase(UserConversationChat.fulfilled, (state, action) => {
      state.conversationisSuccess = true;
      state.conversationisLoading = false;
      state.userconversationDetails = action.payload;
    });
    builder.addCase(UserConversationChat.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      // toast.error(action.payload);
    });

    
    builder.addCase(getAllSellerConversationUsers.pending, (state, action) => {
      state.getUsersInConversationisLoading = true;
    });
    builder.addCase(
      getAllSellerConversationUsers.fulfilled,
      (state, action) => {
        state.usersInconversation = action.payload;
        state.getUsersInConversationisLoading = false;
      }
    );
    builder.addCase(getAllSellerConversationUsers.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.getUsersInConversationisLoading = false;
    });

    // create user conversation
    builder.addCase(Createconversation.pending, (state, action) => {
      state.conversationisLoading = true;
    });
    builder.addCase(Createconversation.fulfilled, (state, action) => {
      state.conversationDetails = action.payload.conversation;
      state.alertText = "conversation created succesfully";
      state.showAlert = true;
      state.conversationisLoading = false;

      state.alertType = "success";
    });
    builder.addCase(Createconversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      // toast.error(action.payload);
    });

    // Deleteconversation slice

    builder.addCase(Deleteconversation.pending, (state, action) => {});
    builder.addCase(Deleteconversation.fulfilled, (state, action) => {
      state.conversation = state.conversation.filter(
        (x) => x.id !== action.payload
      );
    });
    builder.addCase(Deleteconversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      // toast.error(action.payload);
    });
  },
});

export const { clearconversation } = conversationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.conversation.value

export default conversationSlice.reducer;
