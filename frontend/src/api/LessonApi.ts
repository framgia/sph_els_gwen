import axios from 'axios';
import { API_URL, setAdminHeaders } from '.';

export const getAllLessons = (category_id:number) => {
  return axios.get(`${API_URL}/categories/${category_id}/lessons`, setAdminHeaders());
}

export const getAllChoices = (lesson_id:number) => {
  return axios.get(`${API_URL}/lessons/${lesson_id}/choices`, setAdminHeaders())
}
 
export const deleteLesson = (category_id:number, lesson_id:number) => {
  return axios.delete(`${API_URL}/categories/${category_id}/lessons/${lesson_id}`, setAdminHeaders());
}

export const addLesson = (category_id:number, body: {word:string}) => {
  return axios.post(`${API_URL}/categories/${category_id}/lessons`, body, setAdminHeaders())
}

export const addChoices = (lesson_id: number, body: {name: string, is_correct:boolean}) => {
  return axios.post(`${API_URL}/lessons/${lesson_id}/choices`, body, setAdminHeaders())
}

export const getLesson = (lesson_id: number) => {
  return axios.get(`${API_URL}/lessons/${lesson_id}`, setAdminHeaders());
}

export const updateLesson = (category_id:number, lesson_id: number, body: {word: string}) => {
  return axios.put(`${API_URL}/categories/${category_id}/lessons/${lesson_id}`, body, setAdminHeaders());
}

export const updateChoice = (lesson_id:number, body: {id:number, name:string, is_correct:boolean}) => {   
  return axios.put(`${API_URL}/lessons/${lesson_id}/choices/${body.id}`,{
      name: body.name,
      is_correct: body.is_correct
  }, setAdminHeaders());
}