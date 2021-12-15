import React from 'react'
import { Container } from '../components';
import Loading from './Loading'

export default function Loader() {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-25 overflow-y-auto h-full w-full flex flex-col items-center justify-center'>
      <div>
        <Loading />
        <h1 className='text-center text-secondary text-xl'>Loading...</h1>
      </div>
    </div>
  );
}
