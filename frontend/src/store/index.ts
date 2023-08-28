import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './user-slice';
import basketSlice from './basket-slice';
import categorySlice from './category-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    basket: basketSlice.reducer,
    category: categorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
