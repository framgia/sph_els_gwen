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

export const getUser = (user_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}`, setHeaders());
}

export const followUser = (user_id: number, body: { following_id: number }) => {
  return axios.post(`${API_URL}/users/${user_id}/user_followers`, body, setHeaders());
}

export const getUserFollowing = (user_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}/following`, setHeaders());
}

export const unfollowUser = (user_id: number, following_id: number) => {
  return axios.delete(`${API_URL}/users/${user_id}/following/${following_id}`, setHeaders())
}

export const getUserFollowers = (user_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}/user_followers`, setHeaders());
}

export const getActivityLogs = (user_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}/activity_logs`, setHeaders());
}