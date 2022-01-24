import { createSlice } from '@reduxjs/toolkit';
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryLog {
  id: number;
  word: string;
  choices: ChoiceResults[];
  is_correct: boolean;
}

export interface UserCategoryLog {
  user_id: number,
  category_id: number,
  created_at: Date,
  score: number
}

export interface ChoiceResults {
  name: string;
  user_answer: boolean;
  is_correct: boolean;
}


interface CategoryState {
  categories: Category[],
  userCategoryLogs: UserCategoryLog[],
  categoryLogs: CategoryLog[],
  isLoading: boolean,
  isError: boolean,
  isInvalid: boolean,
  isSubmitted: boolean
}

const initialState: CategoryState = {
  categories: [],
  userCategoryLogs: [],
  categoryLogs: [],
  isLoading: false,
  isError: false,
  isInvalid: false,
  isSubmitted: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.categories = action.payload;
    },
    setUserCategoryLogs: (state, action) => {
      state.userCategoryLogs = action.payload;
    },
    setCategoryLogs: (state, action) => {
      state.categoryLogs = action.payload;
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

export const { getAll, setUserCategoryLogs, setCategoryLogs, setIsLoading, setIsError, setIsInvalid } = categorySlice.actions;
export default categorySlice.reducer;
