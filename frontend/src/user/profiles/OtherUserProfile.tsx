import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav, Container, Loader, Notification } from '@components/';
import {
  getActivityLogs,
  getUser,
  getUserFollowers,
  getUserFollowing,
} from '@api/UserApi';
import { setIsError, setIsLoading } from '@store/category';
import { RootState } from '@store/store';
import {
  ActivityLogResponse,
  FollowerRecord,
  FollowingRecord,
} from '@store/user';
import UserDetails, { UserDetailsProps } from './UserDetails';
import './index.css';

export default function OtherUserProfile() {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const [cookies, _] = useCookies();
  const state = useSelector((state: RootState) => state);
  const [activityLogs, setActivityLogs] = useState<ActivityLogResponse[]>();
  const [user, setUser] = useState<UserDetailsProps>();
  const [categoriesInfo, setCategoriesInfo] = useState({
    words_count: 0,
    categories_count: 0,
  });

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
            return follower.follower[0].id !== user_id;
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

  const _getActivityLogs = (user_id: number) => {
    getActivityLogs(user_id)
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
      .catch();
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (user_id) {
      _getUser(parseInt(user_id));
      _getFollowersOfUser(parseInt(user_id));
      _getFollowingOfUser(parseInt(user_id));
      _getActivityLogs(parseInt(user_id));
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
            <>
              {user && activityLogs && (
                <UserDetails
                  user={user}
                  isCurrentUser={false}
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
