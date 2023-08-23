import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './user-slice';
import categorySlice from './category-slice';
import basketSlice from './basket-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    category: categorySlice.reducer,
    basket: basketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
