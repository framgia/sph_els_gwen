import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category';
import userReducer from './user';
<<<<<<< HEAD
import wordReducer from './words';
=======
import lessonReducer from './lessons';
import choiceReducer from './choices';
>>>>>>> 3de9716 ([SELS-TASK][FE] Lessons and Words Management Functionality)

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
<<<<<<< HEAD
    words: wordReducer
=======
    lessons: lessonReducer,
    choices: choiceReducer
>>>>>>> 3de9716 ([SELS-TASK][FE] Lessons and Words Management Functionality)
  },
});

export type RootState = ReturnType<typeof store.getState>;
