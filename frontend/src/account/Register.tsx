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
import { Response } from './Login';
import { API_URL } from '../App';
import Loader from '../icons/Loader';

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [formState, setFormState] = useState({
    isSuccess: false,
    isSubmitted: false,
    isLoading: false
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch('password', '');
  const navigate = useNavigate();

  const loginValidation = {
    name: {
      required: {
        value: true,
        message: 'Name is required.',
      },
    },
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
      minLength: {
        value: 8,
        message: 'Passwords must be at least 8 characters',
      },
    },
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormState({...formState, isLoading:true});
    axios
      .post(`${API_URL}/users/register`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
      })
      .then((response: Response) => {
        if (response.status === 201) {
          setFormState({
            isSubmitted: true,
            isSuccess: true,
            isLoading:false
          });
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setIsInvalid(true);
          setFormState({
            isSubmitted: false,
            isSuccess: false,
            isLoading: false,
          });
        } else {
          setFormState({
            isSubmitted: true,
            isSuccess: false,
            isLoading: false,
          });
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
      {formState.isLoading && <Loader/>}
      {!formState.isLoading && formState.isSubmitted && (
        <Container>
          <Notification
            isSuccess={formState.isSuccess}
            title={
              formState.isSuccess
                ? 'Your account has been successfully created'
                : 'An error has occurred. Please try again later.'
            }
          />
        </Container>
      )}
      {!formState.isLoading && !formState.isSubmitted && (
        <Container>
          <Card className='card md:h-4/5 xs:h-full'>
            <ProjectLogoGroup dark={true} />
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
              <h1 className='form-title'>Register</h1>
              <div className='w-full flex flex-col mb-4 justify-evenly'>
                <FormInput
                  label='Name'
                  type='text'
                  register={{
                    ...register('name', loginValidation.name),
                  }}
                  errors={errors.name}
                  required
                  placeholder='John Doe'
                />
                <div>
                  <FormInput
                    label='Email'
                    type='email'
                    register={{ ...register('email', loginValidation.email) }}
                    errors={errors.email}
                    required
                    placeholder='your_email@email.com'
                  />
                  {isInvalid && (
                    <span className='text-red-500 -mt-2 text-sm text-center'>
                      Email has already been taken.
                    </span>
                  )}
                </div>
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
                <FormInput
                  label='Password Confirmation'
                  type='password'
                  register={{
                    ...register('password_confirmation', {
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    }),
                  }}
                  errors={errors.password_confirmation}
                  required
                  placeholder='&bull;&bull;&bull;&bull;&bull;'
                />
              </div>
              <Button
                text='Create an account'
                className='md:w-56 xs:w-48 md:mt-5 xs:mt-10'
                dark={true}
              />
              <div className='flex flex-col items-center justify-center mt-4'>
                <h3>Already have an account?</h3>
                <Link
                  to='/login'
                  className='underline text-purple-700 hover:bg-primary hover:text-black px-1 mt-1'
                >
                  Click here to sign in
                </Link>
              </div>
            </form>
          </Card>
        </Container>
      )}
    </>
  );
}
