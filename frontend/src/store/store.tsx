import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
