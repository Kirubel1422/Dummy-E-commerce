import { combineReducers } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApiSlice";

const rootReducers = combineReducers({
  [shopApi.reducerPath]: shopApi.reducer,
});

export default rootReducers;
