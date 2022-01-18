import { Choice } from '@store/lessons';
import axios from 'axios';
import { API_URL, setAdminHeaders } from '.';

export const getAllLessons = (category_id: number) => {
  return axios.get(`${API_URL}/categories/${category_id}/lessons`, setAdminHeaders());
}

export const addLesson = (category_id: number, body: { word: string, choices: { name: string, is_correct: boolean }[] }) => {
  return axios.post(`${API_URL}/categories/${category_id}/lessons`, body, setAdminHeaders())
}

export const updateLesson = (lesson_id: number, body: { word: string, choices: Choice[] }) => {
  return axios.put(`${API_URL}/lessons/${lesson_id}`, body, setAdminHeaders());
}

export const deleteLesson = (category_id: number, lesson_id: number) => {
  return axios.delete(`${API_URL}/categories/${category_id}/lessons/${lesson_id}`, setAdminHeaders());
}

export const getLesson = (lesson_id: number) => {
  return axios.get(`${API_URL}/lessons/${lesson_id}`, setAdminHeaders());
}

