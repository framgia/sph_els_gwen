import { createSlice } from '@reduxjs/toolkit';

export interface Lesson {
  id: number;
  word: string;
  category_id: number;
  // choices: [
  //   {
  //     id: number;
  //     name: string;
  //     lesson_id: number;
  //     is_correct: boolean;
  //   }
  // ];
}

interface LessonState {
  lessons: Lesson[],
  isLoading: boolean,
  // isError: boolean,
  // isInvalid: boolean,
  isAddingLesson: boolean
}

const initialState: LessonState = {
  lessons: [],
  isLoading: false,
  // isError: false,
  // isInvalid: false,
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
    // setIsError: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload;
    // },
    // setIsInvalid: (state, action) => {
    //   state.isLoading = false;
    //   state.isInvalid = action.payload;
    // },
    setIsAddingLesson: (state, action) => {
      state.isAddingLesson = action.payload;
    }
  },
});

export const { getLessons, 
  setIsLoading, 
  //setIsError, setIsInvalid, 
  setIsAddingLesson 
} = lessonSlice.actions;
export default lessonSlice.reducer;
