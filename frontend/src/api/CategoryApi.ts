import axios from 'axios';
import { API_URL, setAdminHeaders, setHeaders } from '.';
import { Choice } from '@store/words';

export const getAllCategories = () => {
  return axios.get(`${API_URL}/categories`, setHeaders());
}

export const addCategory = (body: { name: string, description?: string }) => {
  return axios.post(`${API_URL}/categories`, body, setAdminHeaders());
}

export const getSpecificCategory = (id: number) => {
  return axios.get(`${API_URL}/categories/${id}`, setHeaders())
}

export const deleteCategory = (id: number) => {
  return axios.delete(`${API_URL}/categories/${id}`, setAdminHeaders());
}

export const editCategory = (id: number, body: { name: string, description?: string }) => {
  return axios.put(`${API_URL}/categories/${id}`, body, setAdminHeaders());
}

export const addCategoryLog = (user_id: number, category_id: number, body: { answers: Choice[] }) => {
  return axios.post(`${API_URL}/users/${user_id}/categories/${category_id}/category_logs`, body, setHeaders());
}

export const getCategoryLog = (user_id: number, category_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}/categories/${category_id}/category_logs`, setHeaders());
}

export const getUserCategoryLogs = (user_id: number) => {
  return axios.get(`${API_URL}/users/${user_id}/category_logs`, setHeaders());
};