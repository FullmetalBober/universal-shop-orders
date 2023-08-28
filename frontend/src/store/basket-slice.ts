import { createSlice } from '@reduxjs/toolkit';
import { createBasket, updateBasket } from './basket-actions';

interface BasketState {
  basket?: Basket;
  isLoading: boolean;
}

const initialState: BasketState = {
  basket: undefined,
  isLoading: true,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    replaceBasket(state, action) {
      state.basket = action.payload;
      state.isLoading = false;
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
