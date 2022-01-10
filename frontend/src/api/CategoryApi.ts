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

export const deleteCategory = (token:string, id:string) => {
  return axios.delete(`${API_URL}/categories/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
}

export const editCategory = (token: string, id: string, body: { name: string, description?: string }) => {
  return axios.put(`${API_URL}/categories/${id}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
}