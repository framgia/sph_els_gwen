import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  FormInput,
  Card,
  Container,
  Notification,
  ProjectLogoGroup,
} from '../components';
import './index.css';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setUserAccount({
      ...userAccount,
      [event.target.name]: event.target.value,
    });
  };

  interface Response {
    status: number;
    data: {
      id: number;
      name: string;
      email: string;
      user_image?: string;
    };
    token?: string;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/users/login', userAccount, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response: Response) => {
        if (response.status === 200) {
          setCookie('user', response.data);
          setCookie('token', response.token);
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMsg('Your username or password is incorrect');
        } else {
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    if (cookies.token && cookies.user) {
      navigate('/');
    }
  }, [cookies]);

  return (
    <Container>
      {isError ? (
        <Notification
          isSuccess={false}
          title='An error has occurred. Please try again later.'
        />
      ) : (
        <Card className='card md:h-3/5 sm:h-full'>
          <ProjectLogoGroup />
          <div className='md:w-6/12 xs:w-full flex flex-col '>
            <FormGroup
              title='Login'
              buttonText='Login'
              formMethod='POST'
              onSubmit={handleSubmit}
            >
              <FormInput
                type='email'
                label='email'
                placeholder='your_email@email.com'
                value={userAccount.email}
                onChange={handleChange}
                errorMsg={errorMsg}
              />
              <FormInput
                type='password'
                label='password'
                value={userAccount.password}
                placeholder='&bull;&bull;&bull;&bull;&bull;'
                onChange={handleChange}
                errorMsg={errorMsg}
              />
            </FormGroup>
            <div className='mb-10 flex flex-col items-center justify-center'>
              <h3>Don't have an account yet?</h3>
              <Link
                to='/register'
                className='underline text-purple-500 hover:bg-primary hover:text-black px-2'
              >
                Register here
              </Link>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};
export default Login;
