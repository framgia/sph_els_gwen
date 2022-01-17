import React from 'react'
import { Container } from '.';
import LoadingIcon from '../icons/LoadingIcon';

export default function Loader() {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-25 overflow-y-auto h-full w-full flex flex-col items-center justify-center'>
      <div>
        <LoadingIcon />
        <span className='text-center text-secondary text-xl'>Loading...</span>
      </div>
    </div>
  );
}
