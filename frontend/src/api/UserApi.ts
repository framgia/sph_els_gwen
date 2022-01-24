import axios from 'axios';
import { API_URL, setHeaders } from '.';

export const login = (body: {}) => {
  return axios.post(`${API_URL}/users/login`, body, setHeaders());
}

export const registerUser = (body: {}) => {
  return axios.post(`${API_URL}/users/register`, body, setHeaders());
}

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`, setHeaders());
}