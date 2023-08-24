import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './user-actions';
import { createBasket } from './basket-actions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {} as User,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    // user control
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = {} as User;
      state.isAuthenticated = false;
    },
    replaceUser(state, action) {
      state.user = action.payload;
    },
  },
  // user control
  extraReducers: builder => {
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

    builder.addCase(createBasket.fulfilled, (state, action) => {
      if (action.payload && action.payload.status === 'success')
        state.user.basket = action.payload.data.data;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
