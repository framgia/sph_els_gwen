import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
