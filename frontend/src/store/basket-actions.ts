import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBasket = createAsyncThunk('basket/create', async () => {
  try {
    const data = await axios.post('/api/v1/baskets');
    return data.data;
  } catch (error) {
    console.error(error);
  }
});
