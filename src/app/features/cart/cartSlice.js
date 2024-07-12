import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      state.items.slice(state.items.indexOf(action.payload), 1);
    },
    clearCart: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { removeFromCart, clearCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
