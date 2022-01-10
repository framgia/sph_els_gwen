import axios from 'axios';
import { API_URL, setHeaders } from '.';

export const getAllCategories = () => {
  return axios.get(`${API_URL}/categories`, setHeaders());
}

export const addCategory = (body: { name: string, description?: string }) => {
  return axios.post(`${API_URL}/categories`, body, setHeaders());
}

export const getSpecificCategory = (id: number) => {
  return axios.get(`${API_URL}/categories/${id}`, setHeaders())
}

export const deleteCategory = (id: number) => {
  return axios.delete(`${API_URL}/categories/${id}`, setHeaders());
}

export const editCategory = (id: number, body: { name: string, description?: string }) => {
  return axios.put(`${API_URL}/categories/${id}`, body, setHeaders());
}