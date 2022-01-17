import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';
import wordReducer from './words';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
<<<<<<< HEAD
    lessons: lessonReducer,
=======
    words: wordReducer
>>>>>>> 5b641f4 (changed filenames and terms to words in frontend side)
  },
});

export type RootState = ReturnType<typeof store.getState>;
