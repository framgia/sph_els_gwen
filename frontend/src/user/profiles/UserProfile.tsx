import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Nav, Container, Loader, Notification } from '@components/';
import { UserIcon } from '@icons/';
import { RootState } from '@store/store';
import {
  ActivityLogResponse,
  FollowerRecord,
  FollowingRecord,
  User,
} from '@store/user';
import {
  getUserFollowers,
  getUserFollowing,
  getActivityLogs,
  getUser,
} from '@api/UserApi';
import { setIsError, setIsLoading } from '@store/category';
import UserDetails, { UserDetailsProps } from './UserDetails';
import './index.css';
import { count } from 'console';

export default function UserProfile() {
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [user, setUser] = useState<UserDetailsProps>();
  const [activityLogs, setActivityLogs] = useState<ActivityLogResponse[]>();
  const [categoriesInfo, setCategoriesInfo] = useState({
    words_count: 0,
    categories_count: 0,
  });

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

  const _getActivityLogs = () => {
    getActivityLogs(cookies.user['id'])
      .then((response) => {
        if (response.status === 200) {
          setActivityLogs(response.data.data);
          let words_count = 0;
          let categories_count = 0;
          response.data.data.map((log: ActivityLogResponse) => {
            if (log.user?.id === cookies.user['id']) {
              log.words_count && (words_count += log.words_count);
              log.category && categories_count++;
            }
          });
          setCategoriesInfo({
            words_count,
            categories_count,
          });
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    const { id, name, email, user_image } = cookies.user;
    setUser({ id: id, name: name, email: email, user_image: user_image });
    dispatch(setIsLoading(true));
    _getFollowersOfUser();
    _getFollowingOfUser();
    _getActivityLogs();
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
          {!state.category.isLoading && !state.category.isError && (
            <>
              {user && activityLogs && (
                <UserDetails
                  user={user}
                  isCurrentUser={true}
                  activity_logs={activityLogs}
                  categories_info={categoriesInfo}
                />
              )}
            </>
          )}
        </>
      </Container>
    </>
  );
}
