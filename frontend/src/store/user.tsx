import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user_token: string;
  admin_token: string;
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
  user_token: '',
  admin_token: '',
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
    setUserToken: (state, action) => {
      state.user_token = action.payload;
    },
    setAdminToken: (state, action) => {
      state.admin_token = action.payload;
    },
    removeToken: (state, action) => {
      state.user_token = '';
      state.admin_token = '';
    },
  },
});

export const { setUserToken, setAdminToken, removeToken } = userSlice.actions;
export default userSlice.reducer;