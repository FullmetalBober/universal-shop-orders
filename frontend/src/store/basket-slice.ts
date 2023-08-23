import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: {} as Basket,
    isLoading: false,
  },
  reducers: {
    replaceCategories(state, action) {
      state.basket = action.payload;
    },
  },
});

export const basketActions = basketSlice.actions;

export default basketSlice;
