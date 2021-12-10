import axios from 'axios';
import { Dispatch } from 'redux';

const url = 'http://127.0.0.1:8000/api'

interface User {
    data: {
        id: number,
        name:string,
        user_image?:string,
        is_admin:boolean,
        created_at:Date,
        updated_at:Date
    },
    token?:string,
    error?: {}
}

export const login = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post(
            `${url}/users/login`,
            {
                email: 'test@email.com',
                password: 'test123'
            }
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.error;
        });

        dispatch({
            type: 'LOGIN',
            payload: ''
        });


    }
};