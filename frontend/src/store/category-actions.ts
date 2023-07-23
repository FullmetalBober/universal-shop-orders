import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategoryData = createAsyncThunk(
  'category/fetchData',
  async () => {
    const response = await fetch('api/v1/categories?sort=menuType,name');
    const data = await response.json();
    return data;
  }
);
