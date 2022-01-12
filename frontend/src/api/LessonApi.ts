import axios from 'axios';
import { API_URL, setAdminHeaders } from '.';

export const getAllLessons = (category_id:number) => {
  return axios.get(`${API_URL}/categories/${category_id}/lessons`, setAdminHeaders());
}

export const getAllChoices = (lesson_id:number) => {
  return axios.get(`${API_URL}/lessons/${lesson_id}/choices`, setAdminHeaders())
}