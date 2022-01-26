import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
import UserProfileItem from './UserProfileItem';
import { setIsError, setIsLoading } from '@store/category';

interface SpecificUser {
  id?: number;
  name?: string;
  user_image?: string;
  email?: string;
  followers?: FollowerRecord[];
  following?: FollowingRecord[];
}

export default function UserProfile() {
  const { user_id } = useParams();
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [user, setUser] = useState<SpecificUser>();
  const [isViewingFollowers, setIsViewingFollowers] = useState(true);
  const isFollowing = JSON.parse(
    localStorage.getItem('user_following') || '{}'
  ).find((following: FollowingRecord) => {
    return following.following[0].id === parseInt(user_id ?? '');
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
            return follower.follower[0].id !== cookies.user['id'];
          }
        );
        setUser((value) => ({ ...value, followers: user_followers }));
        dispatch(setIsLoading(false));
      })
      .catch();
  };

  const _getFollowingOfUser = (user_id: number) => {
    getUserFollowing(user_id)
      .then((response) => {
        const user_following = response.data.data.filter(
          (following: FollowingRecord) => {
            return following.following[0].id !== cookies.user['id'];
          }
        );
        setUser({ ...user, following: user_following });
      })
      .catch();
  };

  const handleFollowUser = (user_id: number) => {
    dispatch(setIsLoading(true));
    const request = isFollowing
      ? unfollowUser(cookies.user['id'], user_id)
      : followUser(cookies.user['id'], { following_id: user_id });

    request
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(setIsLoading(false));
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    if (user_id) {
      dispatch(setIsLoading(true));
      _getUser(parseInt(user_id));
      _getFollowersOfUser(parseInt(user_id));
    }
  }, [user_id]);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex flex-col m-10'>
        <>
          {state.category.isLoading && !state.category.isLoading && <Loader />}
          {state.category.isError && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {!state.category.isLoading && !state.category.isLoading && (
            <>
              <Link
                to='/users/all'
                className='button bg-primary self-start mb-8'
              >
                Back to users list
              </Link>
              <div className='flex items-center justify-around w-full my-5'>
                <UserIcon className='w-36' />
                <div className='flex flex-col flex-grow ml-4'>
                  <span className='text-3xl font-bold flex-grow'>
                    {user?.name}
                  </span>
                  <span className='text-2xl'>{user?.email}</span>
                </div>
                <button
                  className={`button  w-60 ${
                    isFollowing ? 'bg-secondary text-white' : 'bg-primary'
                  }`}
                  onClick={() => {
                    user?.id && handleFollowUser(user.id);
                  }}
                >
                  {isFollowing ? 'Following' : 'Follow this user'}
                </button>
              </div>
              <div className='flex self-start w-1/5 my-5'>
                <button
                  className={`py-4 px-6 flex-grow ${
                    isViewingFollowers
                      ? 'bg-primary '
                      : 'hover:bg-secondary hover:text-white'
                  }`}
                  onClick={() => setIsViewingFollowers(true)}
                >
                  Followers
                </button>
                <button
                  className={`py-4 px-6 flex-grow ${
                    !isViewingFollowers
                      ? 'bg-primary '
                      : 'hover:bg-secondary hover:text-white'
                  }`}
                  onClick={() => {
                    user_id && _getFollowingOfUser(parseInt(user_id));
                    setIsViewingFollowers(false);
                  }}
                >
                  Following
                </button>
              </div>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 w-full'>
                {isViewingFollowers
                  ? user?.followers?.map((follower) => {
                      return (
                        <UserProfileItem
                          user={follower.follower[0]}
                          key={follower.id}
                          disabled={true}
                        />
                      );
                    })
                  : user?.following?.map((following) => {
                      return (
                        <UserProfileItem
                          user={following.following[0]}
                          key={following.id}
                          disabled={true}
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
