import { createSlice } from '@reduxjs/toolkit';

export interface Word {
  id: number;
  word: string;
  category_id: number;
  choices: Choice[]
}

export interface Choice {
  id: number;
  name: string;
  lesson_id: number;
  is_correct: boolean;
}


interface WordState {
  words: Word[],
  isLoading: boolean,
  isAddingWord: boolean
}

const initialState: WordState = {
  words: [],
  isLoading: false,
  isAddingWord: false
};

export const wordSlice = createSlice({
  name: 'words',
  initialState: initialState,
  reducers: {
    getWords: (state, action) => {
      state.words = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAddingWord: (state, action) => {
      state.isAddingWord = action.payload;
    },
  },
});

export const { getWords,
  setIsLoading,
  setIsAddingWord,
} = wordSlice.actions;
export default wordSlice.reducer;
