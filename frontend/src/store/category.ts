import { createSlice } from '@reduxjs/toolkit';
import { Word } from './words';
export interface Category {
  id: number;
  name: string;
  description: string;
}
interface CategoryState {
  categories: Category[],
  isLoading: boolean,
  isError: boolean,
  isInvalid: boolean,
  isSubmitted: boolean
}

const initialState: CategoryState = {
  categories: [],
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

export const { getAll, setIsLoading, setIsError, setIsInvalid } = categorySlice.actions;
export default categorySlice.reducer;
