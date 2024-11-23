import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { busSlice } from "./slices/bus";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bus: busSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
