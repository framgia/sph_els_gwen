import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Nav, Container, Loader, Notification } from '@components/';
import { UserIcon } from '@icons/';
import { RootState } from '@store/store';
import { FollowerRecord, FollowingRecord } from '@store/user';
import {
  followUser,
  getUser,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
} from '@api/UserApi';
import { setIsError, setIsLoading } from '@store/category';
import UserDetails, { UserDetailsProps } from './UserDetails';
import './index.css';
import { Link, useParams } from 'react-router-dom';
import UserProfileItem from './UserProfileItem';

export default function UserProfile() {
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();
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

  const _getFollowersOfUser = () => {
    getUserFollowers(cookies.user['id'])
      .then((response) => {
        const user_followers = response.data.data.filter(
          (follower: FollowerRecord) => {
            return follower.follower[0].id !== cookies.user['id'];
          }
        );
        setUser((value) => ({ ...value, followers: user_followers }));
      })
      .catch(() => dispatch(setIsError(true)));
  };

  const _getFollowingOfUser = () => {
    getUserFollowing(cookies.user['id'])
      .then((response) => {
        const user_following = response.data.data.filter(
          (following: FollowingRecord) => {
            return following.following[0].id !== cookies.user['id'];
          }
        );
        setUser((value) => ({ ...value, following: user_following }));
        dispatch(setIsLoading(false));
      })
      .catch();
  };

  useEffect(() => {
    const { id, name, email, user_image } = cookies.user;
    setUser({ id: id, name: name, email: email, user_image: user_image });
    dispatch(setIsLoading(true));
    _getFollowersOfUser();
    _getFollowingOfUser();
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex md:flex-row xs:flex-col w-full border md:fixed'>
        <>
          {/* show loading component if state is currently loading */}
          {state.category.isLoading && !state.category.isError && <Loader />}
          {/* display error notification with refresh button (only if not loading) */}
          {state.category.isError && !state.category.isLoading && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {/* only show content if not currently loading or no errors encountered */}
          {!state.category.isLoading && !state.category.isLoading && (
            <>{user && <UserDetails user={user} isCurrentUser={true} />}</>
          )}
        </>
      </Container>
    </>
  );
}
