import { createSlice } from '@reduxjs/toolkit';
import { createBasket, updateBasket } from './basket-actions';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: {} as Basket,
    isLoading: true,
  },
  reducers: {
    replaceBasket(state, action) {
      state.basket = action.payload;
      if (action.payload) state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(createBasket.fulfilled, (state, action) => {
      if (action.payload && action.payload.status === 'success')
        state.basket = action.payload.data.data;
      state.isLoading = false;
    });

    builder.addCase(updateBasket.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(updateBasket.fulfilled, (state, action) => {
      if (action.payload && action.payload.status === 'success')
        state.basket = action.payload.data.data;
      state.isLoading = false;
    });
  },
});

export const basketActions = basketSlice.actions;

export default basketSlice;
