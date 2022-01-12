import { createSlice } from '@reduxjs/toolkit';

export interface Choice {
  id: number;
  name: string;
  lesson_id: number;
  is_correct: boolean;
}

interface ChoiceState {
  choices: Choice[],
  // isLoading: boolean,
  // isError: boolean,
  // isInvalid: boolean,
}

const initialState: ChoiceState = {
  choices: [],
  //isLoading: false,
  // isError: false,
  // isInvalid: false,
};

export const choiceSlice = createSlice({
  name: 'choice',
  initialState: initialState,
  reducers: {
    getChoices: (state, action) => {
      state.choices = [...state.choices, ...action.payload];
    },
    // setIsLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    // setIsError: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload;
    // },
    // setIsInvalid: (state, action) => {
    //   state.isLoading = false;
    //   state.isInvalid = action.payload;
    // },
  },
});

export const { getChoices, 
  // setIsLoading, setIsError, setIsInvalid 
} = choiceSlice.actions;
export default choiceSlice.reducer;
