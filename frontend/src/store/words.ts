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
  word_id: number;
  is_correct: boolean;
}


interface WordState {
  words: Word[],
  answers: Choice[],
  isLoading: boolean,
  isAddingWord: boolean
}

const initialState: WordState = {
  words: [],
  answers: [],
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
    setAnswers: (state, action) => {
      state.answers = [...state.answers, action.payload];
    },
    clearAnswers: (state, action) => {
      state.answers = [];
    },
  },
});

export const { getWords,
  setIsLoading,
  setIsAddingWord,
  setAnswers,
  clearAnswers
} = wordSlice.actions;
export default wordSlice.reducer;
