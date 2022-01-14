import { createSlice } from '@reduxjs/toolkit';

export interface Lesson {
  id: number;
  word: string;
  category_id: number;
}

interface LessonState {
  lessons: Lesson[],
  isLoading: boolean,
  isAddingLesson: boolean
}

const initialState: LessonState = {
  lessons: [],
  isLoading: false,
  isAddingLesson: false
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState: initialState,
  reducers: {
    getLessons: (state, action) => {
      state.lessons = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAddingLesson: (state, action) => {
      state.isAddingLesson = action.payload;
    },
  },
});

export const { getLessons, 
  setIsLoading,
  setIsAddingLesson,
} = lessonSlice.actions;
export default lessonSlice.reducer;