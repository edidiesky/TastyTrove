import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetSingleCart,
  GetUserCart,
  GetAllCart,
  GetAllRoomAndCart,
  DeleteCart,
  UpdateCart,
  CreateCart,
} from "./cartReducer";

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
};




const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartAlert: (state, action) => {
      state.cartAlert = false;
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
      state.getsingleCartisLoading = true;
    });
    builder.addCase(CreateCart.fulfilled, (state, action) => {
      state.getsingleCartisLoading = false;
      state.getsingleCartisSuccess = true;
      state.cart = action.payload;
    });
    builder.addCase(CreateCart.rejected, (state, action) => {
      state.getsingleCartisSuccess = false;
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
  clearCartMessage
} = cartSlice.actions

export default cartSlice.reducer;
