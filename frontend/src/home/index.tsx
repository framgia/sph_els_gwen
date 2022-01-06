import React, { useEffect } from 'react';
import {Nav} from '../components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Nav className='bg-primary'/>
      <h1 className='text-center text-2xl mt-2'>Hello homepage</h1>
    </div>
  );
}

export default Home;