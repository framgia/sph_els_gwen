import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token || (!cookies.user && cookies.token === 'undefined')) {
      navigate('/login');
    }
  }, [cookies]);

  return (
    <div>
      <Nav />
      <h1 className='text-center text-2xl mt-2'>Hello homepage</h1>
    </div>
  );
}

export default Home;