import { Choice } from '@store/words';
import axios from 'axios';
import { API_URL, setAdminHeaders, setHeaders } from '.';

export const getAllWords = (category_id: number) => {
  return axios.get(`${API_URL}/categories/${category_id}/words`, setHeaders());
}

export const addWord = (category_id: number, body: { word: string, choices: { name: string, is_correct: boolean }[] }) => {
  return axios.post(`${API_URL}/categories/${category_id}/words`, body, setAdminHeaders())
}

export const updateWord = (word_id: number, body: { word: string, choices: Choice[] }) => {
  return axios.put(`${API_URL}/words/${word_id}`, body, setAdminHeaders());
}

export const deleteWord = (category_id: number, word_id: number) => {
  return axios.delete(`${API_URL}/categories/${category_id}/words/${word_id}`, setAdminHeaders());
}

export const getSpecificWord = (word_id: number) => {
  return axios.get(`${API_URL}/words/${word_id}`, setAdminHeaders());
}

