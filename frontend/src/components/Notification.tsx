import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from '.';
import Check from '../icons/Check';
import Error from '../icons/Error';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isSuccess: boolean;
  title: string;
  children?: any;
}

export default function Notification(props: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col items-center justify-between h-1/3'>
      {props.isSuccess ? <Check /> : <Error />}
      <h1 className='text-4xl'>{props.title}</h1>
      {props.isSuccess ? (
        <Link to='/login' className='button'>
          Proceed to login
        </Link>
      ) : (
        <button
          className='button'
          onClick={() => {
            navigate(0);
          }}
        >
          Go back
        </button>
      )}
    </div>
  );
}
