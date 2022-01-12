import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';
import lessonReducer from './lessons';
import choiceReducer from './choices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    lessons: lessonReducer,
    choices: choiceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
