import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  CreateReview,
  GetMenuReviews,
  GetReviewHistoryForAdmin,
} from "./reviewReducer";
const initialState = {
  getMenuReviewisLoading: false,
  getMenuReviewisSuccess: false,

  createMenuReviewisLoading: false,
  createMenuReviewisSuccess: false,
  reviews: [],
  review: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews: (action) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    // CreateReview
    builder.addCase(CreateReview.pending, (state, action) => {
      state.createMenuReviewisLoading = true;
    });
    builder.addCase(CreateReview.fulfilled, (state, action) => {
      state.createMenuReviewisLoading = false;
      state.createMenuReviewisSuccess = true;
      state.review = action.payload.review;
    });
    builder.addCase(CreateReview.rejected, (state, action) => {
      state.createMenuReviewisLoading = false;
      state.createMenuReviewisSuccess = true;
      toast.error(action.payload);
    });

    // GetMenuReview
    builder.addCase(GetMenuReviews.pending, (state, action) => {
      state.getMenuReviewisLoading = true;
    });
    builder.addCase(GetMenuReviews.fulfilled, (state, action) => {
      state.getMenuReviewisLoading = false;
      state.getMenuReviewisSuccess = true;
      state.reviews = action.payload.review;
    });
    builder.addCase(GetMenuReviews.rejected, (state, action) => {
      state.getMenuReviewisLoading = false;
      state.getMenuReviewisSuccess = true;
      toast.error(action.payload);
    });

    // GetReviewHistoryForAdmin
    builder.addCase(GetReviewHistoryForAdmin.pending, (state, action) => {
      state.getMenuReviewisLoading = true;
    });
    builder.addCase(GetReviewHistoryForAdmin.fulfilled, (state, action) => {
      state.getMenuReviewisLoading = false;
      state.getMenuReviewisSuccess = true;
      state.reviews = action.payload.review;
    });
    builder.addCase(GetReviewHistoryForAdmin.rejected, (state, action) => {
      state.getMenuReviewisLoading = false;
      state.getMenuReviewisSuccess = true;
      toast.error(action.payload);
    });
  },
});
export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
