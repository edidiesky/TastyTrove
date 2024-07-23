import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetSingleCart,
  GetUserCart,
  GetAllCart,
  GetAllRoomAndCart,
  DeleteSingleCart,
  UpdateCart,
  CreateCart,
} from "./cartReducer";
import toast from "react-hot-toast";

const initialState = {
  isSuccess: false,
  isError: false,
  cart: [],
  cartDetails: null,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  cartAlert: false,
  totalPrice: 0,
  totalQuantity: 0,
  estimatedTax: 0,
  TotalShoppingPrice: 0,
  bagId: 0,

  getsingleCartisLoading: false,
  getsingleCartisSuccess: false,
  getsingleCartisError: false,

  deleteCartisLoading: false,
  deleteCartisSuccess: false,
  deleteCartisError: false,

  updateCartisLoading: false,
  updateCartisSuccess: false,
  updateCartisError: false,

  createCartisLoading: false,
  createCartisSuccess: false,
  createCartisError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartAlert: (state, action) => {
      state.createCartisSuccess = false;
      state.createCartisLoading = false;
      state.deleteCartisSuccess = false;
      state.deleteCartisLoading = false;
    },
    clearCartMessage: (state, action) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
    onCartAlert: (state, action) => {
      const bagItemPayload = action.payload;
      state.cartAlert = true;
      state.cartDetails = bagItemPayload;
    },

    ClearBagData: (state, action) => {
      localStorage.removeItem("bagItem");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("TotalShoppingPrice");
      state.isLoading = false;
      state.isSuccess = false;
      state.alertType = "";
      state.showAlert = false;
      state.alertText = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateCart.pending, (state, action) => {
      state.createCartisLoading = true;
    });
    builder.addCase(CreateCart.fulfilled, (state, action) => {
      state.createCartisLoading = false;
      state.createCartisSuccess = true;
      state.cartDetails = action.payload;
      toast.success("Cart has been succesfully placed!!");
    });
    builder.addCase(CreateCart.rejected, (state, action) => {
      state.createCartisSuccess = false;
      state.createCartisLoading = false;
      toast.error(action.payload);
    });

    // GetUserCart
    builder.addCase(GetUserCart.pending, (state, action) => {
      state.getsingleCartisLoading = true;
    });
    builder.addCase(GetUserCart.fulfilled, (state, action) => {
      state.getsingleCartisLoading = false;
      state.getsingleCartisSuccess = true;
      state.cart = action.payload;
      //  toast.success("Room has been succesfully booked!!");
    });
    builder.addCase(GetUserCart.rejected, (state, action) => {
      state.getsingleCartisSuccess = false;
      state.getsingleCartisLoading = false;
      //  toast.error(action.payload);
    });

    builder.addCase(DeleteSingleCart.pending, (state, action) => {
      state.deleteCartisLoading = true;
    });
    builder.addCase(DeleteSingleCart.fulfilled, (state, action) => {
      state.deleteCartisSuccess = true;
      state.deleteCartisLoading = false;
      state.cart = state.cart.filter((cart) => cart.id !== action.payload);
      toast.success("cart has been deleted");
    });
    builder.addCase(DeleteSingleCart.rejected, (state, action) => {
      state.deleteCartisSuccess = false;
      state.deleteCartisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(GetSingleCart.pending, (state, action) => {
      // state.deleteCartisLoading = true;
    });
    builder.addCase(GetSingleCart.fulfilled, (state, action) => {
      // state.deleteCartisSuccess = true;
      // state.deleteCartisLoading = false;
      state.cartDetails = action.payload;
    });
    builder.addCase(GetSingleCart.rejected, (state, action) => {
      state.deleteCartisSuccess = false;
      state.deleteCartisLoading = false;
      toast.error(action.payload);
    });
  },
});

// console.log(cartSlice);
export const {
  clearCartAlert,
  addProductToCart,
  calculateBagItem,
  removeBagItem,
  ClearBagData,
  increaseBagQty,
  decreaseBagQty,
  onCartAlert,
  clearCartMessage,
} = cartSlice.actions;

export default cartSlice.reducer;
