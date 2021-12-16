import React, { useEffect } from 'react';
import {Nav} from '../components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    // if(!cookies.token) {
    //   navigate('/login');
    // }
    // else if () {
      
    //}
    if (cookies.user) {
      if (!cookies.admin_token || cookies.admin_token === 'undefined') {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [cookies]);

  return (
    <div>
      <Nav className='bg-primary'/>
      <h1 className='text-center text-2xl mt-2'>Hello homepage</h1>
    </div>
  );
}

export default Home;