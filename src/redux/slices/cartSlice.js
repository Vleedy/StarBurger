import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id && obj.activeSize === action.payload.activeSize
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items
        .reduce((sum, obj) => {
          const price = obj.activeSize === 'Standart' ? obj.price : (obj.price * 1.5).toFixed(2);
          return price * obj.count + sum;
        }, 0)
        .toFixed(2);
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id && obj.activeSize === action.payload.activeSize
      );

      if (findItem) {
        findItem.count--;
        const price =
          findItem.activeSize === 'Standart' ? findItem.price : (findItem.price * 1.5).toFixed(2);
        state.totalPrice = (state.totalPrice - price).toFixed(2);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => {
        if (obj.id !== action.payload.id || obj.activeSize !== action.payload.activeSize) {
          return obj;
        }
      });
      state.totalPrice = state.items
        .reduce((sum, obj) => {
          const price = obj.activeSize === 'Standart' ? obj.price : (obj.price * 1.5).toFixed(2);
          return price * obj.count + sum;
        }, 0)
        .toFixed(2);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id, activeSize) => (state) =>
  state.cart.items.find((obj) => obj.id === id && obj.activeSize === activeSize);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
