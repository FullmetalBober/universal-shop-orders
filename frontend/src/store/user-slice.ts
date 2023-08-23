import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './user-actions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {} as User,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.user = {} as User;
      state.isAuthenticated = false;
    },
    replaceUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    // fetchBasketData
    builder.addCase(fetchUserData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload && action.payload.status === 'success') {
        state.user = action.payload.data.data;
        state.isAuthenticated = true;
      }
      state.isLoading = false;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
