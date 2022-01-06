import axios from 'axios';
import { API_URL } from '.';

export const login = (body: {}) => {
    return axios
        .post(`${API_URL}/users/login`, body, {
            headers: { 'Content-Type': 'application/json' },
        });
}

export const registerUser = (body: {}) => {
    return axios
        .post(`${API_URL}/users/register`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept',
            },
        })
}