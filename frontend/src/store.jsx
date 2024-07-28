import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./features/menu/menuSlice";
import modalSlice from "./features/modals/modalSlice";
import authSlice from "./features/auth/authSlice";
import reservationSlice from "./features/reservation/reservationSlice";
import paymentSlice from "./features/payment/paymentSlice";
import statSlice from "./features/stat/statSlice";
import cartSlice from "./features/cart/cartSlice";
import notificationSlice from "./features/notification/notificationSlice";
import { conversationSlice } from "./features/conversation/conversationSlice";
export const store = configureStore({
  reducer: {
    menu: menuSlice,
    modal: modalSlice,
    auth: authSlice,
    reservation: reservationSlice,
    payment: paymentSlice,
    stat: statSlice,
    cart: cartSlice,
    notification: notificationSlice,
    conversation: conversationSlice,
  },
});
