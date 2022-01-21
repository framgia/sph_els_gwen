import React from 'react';
import { Card } from '@components/';
import { User } from '@store/user';
import { UserIcon } from '@icons/';
import { Link } from 'react-router-dom';

export default function UserProfileItem(props: { user: User }) {
  return (
    <Card className='category-item-card border-gray-400 mx-auto'>
      <div className='flex flex-col items-center w-full h-full justify-between'>
        <UserIcon />
        <p className='md:text-2xl xs:text-xl font-medium text-center'>{props.user.name}</p>
        <Link to='/' className='button bg-primary mt-7 text-center'>View this user's profile</Link>
      </div>
    </Card>
  );
}
