import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 'All',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearchValue(state, action) {
      if (action.payload !== '') {
        state.category = 'All';
      }
      state.searchValue = action.payload;
    },
    setPage(state, action) {
      state.page = state.page + action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategory, setSearchValue, setPage } = filterSlice.actions;

export default filterSlice.reducer;
