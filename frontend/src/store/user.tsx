import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  token: string;
  user: [
    {
      id: number;
      name: string;
      email: string;
      user_image: string;
    }
  ];
}

const initialState: UserState = {
  token: '',
  user: [
    {
      id: 0,
      name: '',
      email: '',
      user_image: '',
    },
  ],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = '';
    },
  },
});

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;