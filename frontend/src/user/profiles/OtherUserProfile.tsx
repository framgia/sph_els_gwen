import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav, Container, Loader, Notification } from '@components/';
import { getUser, getUserFollowers, getUserFollowing } from '@api/UserApi';
import { setIsError, setIsLoading } from '@store/category';
import { RootState } from '@store/store';
import { FollowerRecord, FollowingRecord } from '@store/user';
import UserDetails, { UserDetailsProps } from './UserDetails';
import './index.css';

export default function OtherUserProfile() {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const [cookies, _] = useCookies();
  const state = useSelector((state: RootState) => state);

  const [user, setUser] = useState<UserDetailsProps>();

  const _getUser = (user_id: number) => {
    getUser(user_id)
      .then((response) => {
        const { id, name, email, user_image } = response.data.data;
        setUser({
          id: id,
          name: name,
          email: email,
          user_image: user_image,
        });
      })
      .catch(() => dispatch(setIsError(true)));
  };

  const _getFollowersOfUser = (user_id: number) => {
    getUserFollowers(user_id)
      .then((response) => {
        const user_followers = response.data.data.filter(
          (follower: FollowerRecord) => {
            return follower.follower[0].id !== cookies.user['id'];
          }
        );
        setUser((previous) => ({ ...previous, followers: user_followers }));
      })
      .catch(() => dispatch(setIsError(true)));
  };

  const _getFollowingOfUser = (user_id: number) => {
    getUserFollowing(user_id)
      .then((response) => {
        const user_following = response.data.data.filter(
          (following: FollowingRecord) => {
            return following.following[0].id !== cookies.user['id'];
          }
        );
        setUser((previous) => ({ ...previous, following: user_following }));
        dispatch(setIsLoading(false));
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (user_id) {
      _getUser(parseInt(user_id));
      _getFollowersOfUser(parseInt(user_id));
      _getFollowingOfUser(parseInt(user_id));
    }
  }, [user_id]);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex md:fixed md:flex-row xs:flex-col w-full'>
        <>
          {state.category.isLoading && state.category.isLoading && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {!state.category.isLoading && !state.category.isLoading && (
            <>{user && <UserDetails user={user} isCurrentUser={false} />}</>
          )}
        </>
      </Container>
    </>
  );
}
