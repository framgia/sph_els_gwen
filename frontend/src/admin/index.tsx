import React, { useEffect } from 'react';
import { Nav } from '@components/';
import CategoriesList from './categories/CategoriesList';


export default function AdminDashboard() {
  return (
    <div>
      <Nav className='bg-purple-200' />
      <CategoriesList/>
    </div>
  );
}
