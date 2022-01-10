import { createSlice } from '@reduxjs/toolkit';

interface LessonResponse {
  id:number;
  word:string;
  category_id:number;
  created_at: Date;
  updated_at:Date;
}

interface LessonState {
  lessons: LessonResponse[],
  isLoading: boolean,
  isError: boolean,
  isInvalid: boolean,
  isSubmitted: boolean
}

const initialState: LessonState = {
  lessons: [],
  isLoading: false,
  isError: false,
  isInvalid: false,
  isSubmitted: false,
};

export const lessonSlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.lessons = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    setIsInvalid: (state, action) => {
      state.isLoading = false;
      state.isInvalid = action.payload;
    },
    setIsSubmitted: (state, action) => {
      state.isLoading = false;
      state.isSubmitted = action.payload;
    }
  },
});

export const { getAll, setIsLoading, setIsError, setIsInvalid } = lessonSlice.actions;
export default lessonSlice.reducer;
