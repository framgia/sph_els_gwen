import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  ProjectLogoGroup,
  FormInput,
  Notification,
  Loader,
} from '@components/';
import { Response } from '@user/UserLogin';
import { login } from '@api/UserApi';
import { setAdminToken } from '@store/user';
import { useCookies } from 'react-cookie';
<<<<<<< HEAD
import { store } from '@store/store'
=======
import {store} from '@store/store'
>>>>>>> 6d43df4 ([SELS-TASK][FE] Lessons and Words Management Markup)

type Inputs = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const [cookies, setCookie] = useCookies();
  const [isInvalid, setIsInvalid] = useState(false);
  const [formState, setFormState] = useState({
    isError: false,
    isLoading: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      .then((response: Response) => {
        if (response.status === 200) {
          setCookie('admin_token', response.data?.token, { path: '/' });
          dispatch(setAdminToken(response.data?.token));
          const state = store.getState();
          setFormState({ ...formState, isLoading: false });
          navigate('/admin/dashboard');
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setIsInvalid(true);
        } else {
          setFormState({ ...formState, isError: true });
        }
        setFormState({ ...formState, isLoading: false });
      });
  };

  return (
    <>
      {formState.isError && !formState.isLoading && (
        <Container className='h-screen'>
          <Notification
            isSuccess={false}
            title='An error has occurred. Please try again later.'
            errorAction='refresh'
          />
        </Container>
      )}
      {!formState.isError && formState.isLoading && <Loader />}
      {!formState.isError && !formState.isLoading && (
        <Container className='h-screen'>
          <Card className='card mx-auto xs:h-full md:h-3/5'>
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
