import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { logInUser, logout } = authSlice.actions;
export default authSlice.reducer;
