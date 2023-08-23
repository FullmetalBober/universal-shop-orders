import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const cookieCheckName = import.meta.env.VITE_AUTH_CHECKER;

export const fetchUserData = createAsyncThunk('user/fetchData', async () => {
  const cookieCheck = Cookies.get(cookieCheckName);
  if (!cookieCheck) return;
  try {
    const data = await axios.get('/api/v1/users/me');
    return data.data;
  } catch (error) {
    console.error(error);
  }
});
