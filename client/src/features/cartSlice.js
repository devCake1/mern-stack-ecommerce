import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex((item) => item._id === action.payload._id);
      if (index === -1) {
        const newProduct = { ...action.payload, quantity: 1 };
        delete newProduct.inStock;
        state.cart.push(newProduct);
        if (action.payload.discount > 0) {
          state.total += action.payload.price - ((action.payload.discount * action.payload.price) / 100);
        } else {
          state.total += action.payload.price
        }
      }
    },
    increment: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity += 1;
      if (product.discount > 0) {
        state.total += product.price - ((product.discount * product.price) / 100);
      } else {
        state.total += product.price;
      }
    },
    decrement: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity -= 1;
      if (product.discount > 0) {
        state.total -= product.price - ((product.discount * product.price) / 100);
      } else {
        state.total -= product.price;
      }
      if (product.quantity === 0) {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cart.splice(0, state.cart.length);
      state.total = 0;
    }
  }
});

export const { addToCart, increment, decrement, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
