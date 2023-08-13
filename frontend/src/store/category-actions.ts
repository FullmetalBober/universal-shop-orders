import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoryData = createAsyncThunk(
  'category/fetchData',
  async () => {
    try {
      const data = await axios.get('/api/v1/categories?sort=menuType,name');
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
