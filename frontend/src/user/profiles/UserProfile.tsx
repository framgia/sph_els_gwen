import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Nav, Container, Loader, Notification } from '@components/';
import { RootState } from '@store/store';
import { FollowerRecord, FollowingRecord } from '@store/user';
import { getUserFollowers, getUserFollowing } from '@api/UserApi';
import { setIsError, setIsLoading } from '@store/category';
import UserDetails, { UserDetailsProps } from './UserDetails';
import './index.css';

export default function UserProfile() {
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [user, setUser] = useState<UserDetailsProps>();

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
        setUser({ ...user, following: user_following });
      })
      .catch();
  };

  const handleFollowUser = (user_id: number) => {
    dispatch(setIsLoading(true));
    followUser(cookies.user['id'], { following_id: user_id })
      .then((response) => {
        if (response.status === 201) {
          dispatch(setIsLoading(false));
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  const handleUnfollowUser = (user_id: number) => {
    dispatch(setIsLoading(true));
    unfollowUser(cookies.user['id'], user_id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setIsLoading(false));
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    console.log(cookies.user);
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
          {!state.category.isLoading && !state.category.isError && (
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
                {/* show "following" button if current user is following specific user*/}
                {isFollowing && (
                  <button
                    className={`button  w-60 ${
                      isFollowing ? 'bg-secondary text-white' : 'bg-primary'
                    }`}
                    onClick={() => {
                      user?.id && handleUnfollowUser(user.id);
                    }}
                  >
                    Following
                  </button>
                )}
                {/* show "follow this user" button if current user is not following specific user*/}
                {!isFollowing && (
                  <button
                    className={`button  w-60 ${
                      isFollowing ? 'bg-secondary text-white' : 'bg-primary'
                    }`}
                    onClick={() => {
                      user?.id && handleFollowUser(user.id);
                    }}
                  >
                    Follow this user
                  </button>
                )}
              </div>
              <div className='flex self-start w-1/5 my-5'>
                {/* change button color if viewing followers to indicate button is "active" */}
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
                {/* if viewing followers, display followers. otherwise, display following */}
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
