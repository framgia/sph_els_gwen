
import { store } from '@store/store';

export const API_URL = process.env.REACT_APP_API_URL;

export const setHeaders = () => {
  const token = store.getState().user.token;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
}