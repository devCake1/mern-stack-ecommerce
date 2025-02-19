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
        state.total += action.payload.price
      }
    },
    increment: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity += 1;
      state.total += product.price;
    },
    decrement: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity -= 1;
      state.total -= product.price;
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
