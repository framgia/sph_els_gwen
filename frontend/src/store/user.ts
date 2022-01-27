import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  user_image: string;
}

export interface FollowingRecord {
  id: number,
  following: [User],
  follower_id: number
}
export interface FollowerRecord {
  id: number,
  user_id: number,
  follower: [User]
}

interface UserState {
  user_token: string;
  admin_token: string;
  user: User,
  users: User[],
}

const initialState: UserState = {
  user_token: '',
  admin_token: '',
  user: {
    id: 0,
    name: '',
    email: '',
    user_image: '',
  },
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {      
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.user_token = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
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

export const { setUser, setUserToken, getUsers, setAdminToken, removeToken } = userSlice.actions;
export default userSlice.reducer;