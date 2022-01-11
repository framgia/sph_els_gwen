import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';
import lessonReducer from './lessons';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    lessons: lessonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
