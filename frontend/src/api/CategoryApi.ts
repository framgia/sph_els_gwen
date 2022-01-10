import axios from 'axios';
import { API_URL, setAdminHeaders } from '.';

export const getAllCategories = () => {
  return axios.get(`${API_URL}/categories`, setAdminHeaders());
}

export const addCategory = (body: { name: string, description?: string }) => {
  return axios.post(`${API_URL}/categories`, body, setAdminHeaders());
}

export const getSpecificCategory = (id: number) => {
  return axios.get(`${API_URL}/categories/${id}`, setAdminHeaders())
}

export const deleteCategory = (id: number) => {
  return axios.delete(`${API_URL}/categories/${id}`, setAdminHeaders());
}

export const editCategory = (id: number, body: { name: string, description?: string }) => {
  return axios.put(`${API_URL}/categories/${id}`, body, setAdminHeaders());
}