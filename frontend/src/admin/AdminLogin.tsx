import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  ProjectLogoGroup,
  FormInput,
  Notification,
} from '@components/';
import Loader from '@icons/Loader';
import {Response} from '@user/UserLogin';
import { login } from '@api/UserApi';

type Inputs = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [formState, setFormState] = useState({
    isError:false,
    isLoading:false
  });

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
    setFormState({ ...formState, isLoading: true });
    
    login(data)
    .then((response:Response) => {
        if (response.status === 200) {
          setCookie('user', response.data?.data, { path: '/' });
          setCookie('admin_token', response.data?.token, { path: '/' });
          navigate('/admin/dashboard');
        }
    })
    .catch((error) => {
        if (error.response?.status === 401) {
          setIsInvalid(true);
        } else {
          setFormState({ ...formState, isError: true });
        }
    });
    setFormState({ ...formState, isLoading: false });
  };

  return (
    <>
      {formState.isError && !formState.isLoading && (
        <Container>
          <Notification
            isSuccess={false}
            title='An error has occurred. Please try again later.'
          />
        </Container>
      )}
      {!formState.isError && formState.isLoading && <Loader />}
      {!formState.isError && !formState.isLoading && (
        <Container>
          <Card className='card xs:h-full md:h-3/5'>
            <ProjectLogoGroup dark={false} />
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
              <h1 className='form-title'>Admin Login</h1>
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
                dark={false}
              />
            </form>
          </Card>
        </Container>
      )}
    </>
  );
}
