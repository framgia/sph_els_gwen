import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Container, Loader, Card } from '@components/';
import { RootState } from '@store/store';
import { getAllUsers } from '@api/UserApi';
import { getUsers, User } from '@store/user';
import UserProfileItem from './UserProfileItem';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './index.css';

export default function UsersList() {
  const state = useSelector((state: RootState) => state);
  const [cookies, _] = useCookies();

  const dispatch = useDispatch();

  const _getAllUsers = () => {
    getAllUsers()
      .then((response) => {
        if (response.status === 200) {
          const users = response.data.data.filter(
            (user: User) => user.id !== cookies.user['id']
          );
          dispatch(getUsers(users));
        }
      })
      .catch();
  };

  useEffect(() => {
    _getAllUsers();
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex flex-col m-10'>
        <div className='flex w-full'>
          <Link to='/' className='button bg-primary w-54 text-center'>
            Back to Dashboard
          </Link>
          <h1 className='page-label flex-1 text-center'>Users list</h1>
        </div>
        <div className='users-list-grid w-full my-10'>
          {state.user.users.map((user) => {
            return <UserProfileItem user={user} />;
          })}
        </div>
      </Container>
    </>
  );
}
