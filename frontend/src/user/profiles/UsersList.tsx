import React, { useEffect } from 'react';
import { Container, Loader, Card } from '@components/';
import { getAllUsers } from '@api/UserApi';
import { useDispatch } from 'react-redux';
import { getUsers } from '@store/user';

export default function UsersList() {
  const dispatch = useDispatch();

  const _getAllUsers = () => {
    getAllUsers()
    .then(response => {
      if(response.status===200) {
        dispatch(getUsers(response.data.data));
        console.log(response.data.data);
        
      }
    })
    .catch();
  }


  useEffect(() => {
    
  }, []);


  return <Container className='category-results-group'>
    <>
      {}
    </>
  </Container>;
}
