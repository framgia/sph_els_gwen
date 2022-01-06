import React, { useEffect } from 'react';
import {Nav} from '@components/index';

const UserDashboard = () => {
  return (
    <div>
      <Nav className='bg-primary'/>
      <h1 className='text-center text-2xl mt-2'>Hello user homepage</h1>
    </div>
  );
}

export default UserDashboard;