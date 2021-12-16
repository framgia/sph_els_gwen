import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  ProjectLogoGroup,
  FormInput,
  Notification,
} from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../icons/Loader';
import { API_URL } from '../App';

type Inputs = {
  email: string;
  password: string;
};

export interface Response {
  status: number;
  data?: {
    data: {
      id: number;
      name: string;
      email: string;
      user_image?: string;
    };
    token?: string;
  };
}

export default function Login(props: { isAdmin: boolean }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginValidation = {
    email: {
      required: {
        value: true,
        message: 'Email is required.',
      },
      onChange: () => setIsInvalid(false),
    },
    password: {
      required: {
        value: true,
        message: 'Password is required.',
      },
      onChange: () => setIsInvalid(false),
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post(`${API_URL}/users/login`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsLoading(true);
          setCookie('user', response.data?.data, { path: '/' });
          const is_admin = response.data?.data.name === 'Admin';
          const tokenName = is_admin ? 'admin_token' : 'token';
          setCookie(tokenName, response.data?.token, { path: '/' });
          is_admin ? navigate('/admin/dashboard') : navigate('/');
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setIsInvalid(true);
        } else {
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    if (cookies.user) {
      cookies.admin_token ? navigate('/admin/dashboard') : navigate('/');
    }
  }, [cookies, navigate]);

  return (
    <>
      {isError && !isLoading && (
        <Container>
          <Notification
            isSuccess={false}
            title='An error has occurred. Please try again later.'
          />
        </Container>
      )}
      {!isError && isLoading && <Loader />}
      {!isError && !isLoading && (
        <Container>
          <Card className='card xs:h-full md:h-3/5'>
            <ProjectLogoGroup dark={props.isAdmin ? false : true} />
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
              <h1 className='form-title'>
                {props.isAdmin ? 'Admin Login' : 'Login'}
              </h1>
              <div className='w-full flex flex-col justify-evenly'>
                <FormInput
                  label='Email'
                  type='email'
                  register={{ ...register('email', loginValidation.email) }}
                  errors={errors.email}
                  required
                  placeholder='your_email@email.com'
                />
                <FormInput
                  label='Password'
                  type='password'
                  register={{
                    ...register('password', loginValidation.password),
                  }}
                  errors={errors.password}
                  required
                  placeholder='&bull;&bull;&bull;&bull;&bull;'
                />

                {isInvalid && (
                  <span className='text-red-500 text-md text-center'>
                    Your username or password is incorrect.
                  </span>
                )}
              </div>
              <Button
                text='Login'
                className='md:w-56 xs:w-48 md:mt-5 xs:mt-10'
                dark={!props.isAdmin}
              />
              {!props.isAdmin && (
                <div className='flex flex-col items-center justify-center mt-4'>
                  <h3>Don't have an account yet?</h3>
                  <Link
                    to='/register'
                    className='underline text-purple-700 hover:bg-primary hover:text-black px-1 mt-1'
                  >
                    Register here
                  </Link>
                </div>
              )}
            </form>
          </Card>
        </Container>
      )}
    </>
  );
}
