import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';
import wordReducer from './words';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    words: wordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
