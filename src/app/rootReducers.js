import { combineReducers } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApiSlice";
import cartSlice from "./features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";

const rootReducers = combineReducers({
  [shopApi.reducerPath]: shopApi.reducer,
  cart: cartSlice,
  auth: authSlice,
});

export default rootReducers;
