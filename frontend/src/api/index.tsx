
import { store } from '@store/store';
export const API_URL = process.env.REACT_APP_API_URL;

export const setAdminHeaders = () => {
  const token = store.getState().user.admin_token;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

export const setHeaders = () => {
  let token;
  const state = store.getState().user;
  state.admin_token ? token = state.admin_token : token=state.user_token;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
