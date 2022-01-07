import axios from 'axios';
import { API_URL } from '.';

export const getAllCategories = (token: string) => {
  return axios.get(`${API_URL}/categories`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
}

export const addCategory = (token: string, body: { name: string, description?: string }) => {
  return axios.post(`${API_URL}/categories`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
}

export const getSpecificCategory = (token: string, id: string) => {
  return axios.get(`${API_URL}/categories/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
}