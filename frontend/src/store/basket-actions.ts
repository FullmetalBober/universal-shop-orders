import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
import getId from '../utils/getId';

export const createBasket = createAsyncThunk('basket/create', async () => {
  try {
    const data = await axios.post('/api/v1/baskets');
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

interface IUpdateBasket {
  productId: string;
  quantity: number;
}

export const updateBasket = createAsyncThunk(
  'basket/update',
  async ({ productId, quantity }: IUpdateBasket, { getState }) => {
    const state = getState() as RootState;
    const basket = state.user.user.basket;
    const basketId = basket._id;
    let products = basket.products.map(item => ({
      product: getId(item.product),
      quantity: item.quantity,
    }));

    const productIndex = products.findIndex(item => item.product === productId);

    if (productIndex === -1)
      products = [...products, { product: productId, quantity }];
    else if (quantity === 0) {
      console.log(products);
      products.splice(productIndex, 1);
      console.warn(products);
    } else products[productIndex].quantity = quantity;
    try {
      const data = await axios.patch(`/api/v1/baskets/${basketId}`, {
        products,
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
