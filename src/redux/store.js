import { configureStore } from '@reduxjs/toolkit';
import burger from './slices/burgerSlice';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    burger,
    cart,
    filter,
  },
});
