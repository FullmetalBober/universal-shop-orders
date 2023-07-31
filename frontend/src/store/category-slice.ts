import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryData } from './category-actions';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [] as Category[],
    isLoading: false,
  },
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategoryData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      if (action.payload && action.payload.status === 'success')
        state.categories = action.payload.data.data;
      state.isLoading = false;
    });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
