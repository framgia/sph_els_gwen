import React, { useEffect } from 'react';
import { Nav } from '../components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function AdminDashboard() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.user) {
      if (!cookies.admin_token || cookies.admin_token === 'undefined') {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [cookies]);

    return (
      <div>
        <Nav className='bg-purple-200' />
        <h1 className='text-center text-2xl mt-2'>Hello admin homepage</h1>
      </div>
    );
}
