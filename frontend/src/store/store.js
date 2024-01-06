import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import wishSlice from "./features/wishSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wish: wishSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
