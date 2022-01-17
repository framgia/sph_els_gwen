import { createSlice } from '@reduxjs/toolkit';

export interface Choice {
  id: number;
  name: string;
  lesson_id: number;
  is_correct: boolean;
}

interface ChoiceState {
  choices: Choice[],
}

const initialState: ChoiceState = {
  choices: [],
};

export const choiceSlice = createSlice({
  name: 'choice',
  initialState: initialState,
  reducers: {
    getChoices: (state, action) => {
      // state.choices = [...state.choices, ...action.payload];
    },
  },
});

export const { getChoices, 
} = choiceSlice.actions;
export default choiceSlice.reducer;
