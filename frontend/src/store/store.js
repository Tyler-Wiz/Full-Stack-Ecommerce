import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import wishSlice from "./features/wishSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wish: wishSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
