import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBurgers = createAsyncThunk(
  'burger/fetchBurgerStatus',
  async (params, thunkAPI) => {
    const { category, searchValue, page } = params;
    const { data } = await axios.get(
      searchValue
        ? `https://6374a19f48dfab73a4e42878.mockapi.io/burgers?name=${searchValue.toLowerCase()}`
        : category === 'All'
        ? `https://6374a19f48dfab73a4e42878.mockapi.io/burgers?page=${page}&limit=6`
        : `https://6374a19f48dfab73a4e42878.mockapi.io/burgers?${category.toLowerCase()}=true`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchBurgers.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchBurgers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchBurgers.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = burgerSlice.actions;

export default burgerSlice.reducer;
