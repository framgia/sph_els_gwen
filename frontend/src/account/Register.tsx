import { useState, useEffect } from 'react';
import {
  FormGroup,
  FormInput,
  Card,
  Container,
  Notification,
  ProjectLogoGroup,
} from '../components';

import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg({ email: '', password: '' });
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = newUser.password.length >= 8;
    const isMatch = newUser.password === newUser.password_confirmation;
    if (!isMatch) {
      setErrorMsg({ ...errorMsg, password: 'Passwords do not match.' });
    } else if (!isValid) {
      setErrorMsg({
        ...errorMsg,
        password: 'Password must be at least 8 characters.',
      });
    } else {
      //register
      axios
        .post('http://127.0.0.1:8000/api/users/register', newUser, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.status === 201) {
            setIsSuccess(true);

            setIsSubmitted(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrorMsg({
              ...errorMsg,
              email: 'Email has already been taken.',
            });
          } else {
            setIsSuccess(false);
            setIsSubmitted(true);
          }
        });
    }
  };

  useEffect(() => {
    if (cookies.token && cookies.user) {
      navigate('/');
    }
  }, [cookies]);

  return (
    <Container>
      {isSubmitted ? (
        <Notification
          isSuccess={isSuccess}
          title={
            isSuccess
              ? 'Account created successfully'
              : 'An error has occurred. Please try again later.'
          }
        />
      ) : (
        <Card className='card md:h-4/5 sm:h-full'>
          <ProjectLogoGroup />
          <div className='md:w-6/12 xs:w-full flex flex-col '>
            <FormGroup
              title='Register'
              buttonText='Create an account'
              formMethod='POST'
              onSubmit={handleSubmit}
            >
              <FormInput
                type='name'
                label='name'
                placeholder='John Doe'
                value={newUser.name}
                onChange={handleChange}
              />
              <FormInput
                type='email'
                label='email'
                placeholder='your_email@email.com'
                value={newUser.email}
                onChange={handleChange}
                errorMsg={errorMsg.email}
              />
              <FormInput
                type='password'
                label='password'
                value={newUser.password}
                placeholder='&bull;&bull;&bull;&bull;&bull;'
                onChange={handleChange}
                errorMsg={errorMsg.password}
              />
              <FormInput
                type='password'
                label='password confirmation'
                value={newUser.password_confirmation}
                placeholder='&bull;&bull;&bull;&bull;&bull;'
                onChange={handleChange}
                errorMsg={
                  errorMsg.password.includes('8') ? '' : errorMsg.password
                }
              />
            </FormGroup>
            <div className='mb-10 flex flex-col items-center justify-center'>
              <h3>Already have an account?</h3>
              <Link
                to='/login'
                className='underline text-purple-500 hover:bg-primary hover:text-black px-2'
              >
                Click here to sign in
              </Link>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
}
