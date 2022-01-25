import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  user_image: string;
}

interface FollowingRecord {
  id: number,
  user_id: number,
  following: User
}

interface UserState {
  user_token: string;
  admin_token: string;
  user: User,
  users: [],
  following: FollowingRecord[]
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
  following: []
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
    getFollowing: (state, action) => {
      state.following = action.payload
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

export const { setUser, setUserToken, getUsers, getFollowing, setAdminToken, removeToken } = userSlice.actions;
export default userSlice.reducer;