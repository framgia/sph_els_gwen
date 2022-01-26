import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Nav, Container, Modal, Loader, Notification } from '@components/';
import { RootState } from '@store/store';
import { getAllUsers, getUserFollowing, unfollowUser } from '@api/UserApi';
import { getUsers, User } from '@store/user';
import { setIsError, setIsLoading } from '@store/category';
import { CheckIcon, WarningIcon } from '@icons/';
import UserProfileItem from './UserProfileItem';
import './index.css';

export default function UsersList() {
  const state = useSelector((state: RootState) => state);
  const [cookies, _] = useCookies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [followUser, setFollowUser] = useState(false);

  const dispatch = useDispatch();

  const _getAllUsers = () => {
    dispatch(setIsLoading(true));
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

  const _getAllUserFollowing = () => {
    getUserFollowing(cookies.user['id'])
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            'user_following',
            JSON.stringify(response.data.data)
          );          
          dispatch(setIsLoading(false));
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  const handleUnfollowUser = () => {
    unfollowUser(cookies.user['id'], selectedId)
      .then((response) => {
        if (response.status === 200) {
          setIsModalOpen(false);
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    if (!isModalOpen) {
      _getAllUsers();
      _getAllUserFollowing();
    }
  }, [isModalOpen===false]);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex flex-col m-10'>
        <>
          {state.category.isLoading && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {!state.category.isLoading && !state.category.isError && (
            <>
              <Modal
                isOpen={isModalOpen}
                toggleModal={(isOpen: boolean) => setIsModalOpen(isOpen)}
                buttonAction={
                  followUser
                    ? {}
                    : {
                        buttonText: 'Yes, unfollow user',
                        action: () => {
                          handleUnfollowUser();
                        },
                      }
                }
                closeButtonText={followUser ? 'Close' : 'Cancel'}
              >
                {followUser ? (
                  <>
                    <CheckIcon className='w-32 text-red-300' />
                    <span className='text-3xl font-semibold'>
                      You are now following this user
                    </span>
                  </>
                ) : (
                  <>
                    <WarningIcon className='w-32 text-red-300' />
                    <span className='text-3xl font-semibold'>
                      Are you sure you want to unfollow this user?
                    </span>
                  </>
                )}
              </Modal>
              <div className='flex w-full'>
                <Link to='/' className='button bg-primary w-54 text-center'>
                  Back to Dashboard
                </Link>
                <h1 className='page-label flex-1 text-center'>Users list</h1>
              </div>
              <div className='users-list-grid w-full my-10'>
                {state.user.users.map((user) => {
                  return (
                    <UserProfileItem
                      user={user}
                      key={user.id}
                      toggleModal={(
                        isOpen: boolean,
                        id: number,
                        isFollowUser: boolean
                      ) => {
                        setIsModalOpen(isOpen);
                        setSelectedId(id);
                        setFollowUser(isFollowUser);
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      </Container>
    </>
  );
}
