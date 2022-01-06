import React, { useEffect } from 'react';
import { Nav } from '@components/';


export default function AdminDashboard() {
  return (
    <div>
      <Nav className='bg-purple-200' />
      <h1 className='text-center text-2xl mt-2'>Hello admin homepage</h1>
    </div>
  );
}
