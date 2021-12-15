import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  ProjectLogoGroup,
  FormInput,
  Notification
} from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../icons/Loader';

type Inputs = {
  email: string;
  password: string;
};

export interface Response {
  status: number;
  data: {
    id: number;
    name: string;
    email: string;
    user_image?: string;
  };
  token?: string;
}

export default function Login() {
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
      .post('http://127.0.0.1:8000/api/users/login', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsLoading(true);
          setCookie('user', response.data);
          setCookie('token', response.token);
          navigate('/');
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
    if (cookies.token && cookies.user) {
      navigate('/');
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
          <Card className='card md:h-3/5 sm:h-full'>
            <ProjectLogoGroup />
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
              <h1 className='form-title'>Login</h1>
              <div className='w-full flex flex-col justify-evenly flex-grow'>
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
              <Button text='Login' className='md:w-56 xs:w-48' />
              <div className='flex flex-col items-center justify-center mt-4'>
                <h3>Don't have an account yet?</h3>
                <Link
                  to='/register'
                  className='underline text-purple-700 hover:bg-primary hover:text-black px-1 mt-1'
                >
                  Register here
                </Link>
              </div>
            </form>
          </Card>
        </Container>
      )}
    </>
  );
}
