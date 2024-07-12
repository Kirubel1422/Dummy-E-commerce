import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers";
import { shopApi } from "../api/shopApiSlice";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
