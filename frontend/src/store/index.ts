import { configureStore } from '@reduxjs/toolkit';

import categorySlice from './category-slice';

const store = configureStore({
  reducer: { category: categorySlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
