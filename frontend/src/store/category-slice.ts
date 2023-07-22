import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryData } from './category-actions';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
  },
  reducers: {
    replaceCategories(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      if (action.payload.status === 'success')
        state.items = action.payload.data;
    });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
