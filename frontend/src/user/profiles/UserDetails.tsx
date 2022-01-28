import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { GridContent } from '@components/';
import {
  FollowerRecord,
  FollowingRecord,
  ActivityLogResponse,
} from '@store/user';
import { followUser, unfollowUser } from '@api/UserApi';
import UserProfileItem from './UserProfileItem';
import { setIsError, setIsLoading } from '@store/category';
import UserInfo from './UserInfo';
import ActivityLog from './ActivityLog';

export interface UserDetailsProps {
  id?: number;
  name?: string;
  user_image?: string;
  email?: string;
  followers?: FollowerRecord[];
  following?: FollowingRecord[];
}

export default function UserDetails(props: {
  user: UserDetailsProps;
  activity_logs?: ActivityLogResponse[];
  isCurrentUser?: boolean;
  categories_info?: {
    words_count: number;
    categories_count?: number;
  };
}) {
  const { user_id } = useParams();
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();
  const [isViewing, setIsViewing] = useState('followers');
  const isFollowing = JSON.parse(
    localStorage.getItem('user_following') || '{}'
  ).find((following: FollowingRecord) => {
    return following.following[0].id === parseInt(user_id ?? '');
  });

  const handleFollowUser = () => {
    dispatch(setIsLoading(true));
    if (props.user.id) {
      const request = isFollowing
        ? unfollowUser(cookies.user['id'], props.user.id)
        : followUser(cookies.user['id'], { following_id: props.user.id });

      request
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            dispatch(setIsLoading(false));
          }
        })
        .catch(() => dispatch(setIsError(true)));
    }
  };

  return (
    <>
      <UserInfo
        user={{
          id: props.user.id ?? 0,
          name: props.user.name ?? '',
          email: props.user.email ?? '',
          user_image: props.user.user_image ?? '',
        }}
        followers={props.user.followers?.length}
        following={props.user.following?.length}
        setIsViewing={(view) => {
          setIsViewing(view);
        }}
        categories_info={props.categories_info}
      >
        <>
          {!props.isCurrentUser && (
            <button
              className={`button my-5 w-60 ${
                isFollowing ? 'bg-secondary text-white' : 'bg-primary'
              }`}
              onClick={handleFollowUser}
            >
              {isFollowing ? 'Following' : 'Follow this user'}
            </button>
          )}
        </>
      </UserInfo>
      <div className='user-details-content'>
        {isViewing === 'followers' && (
          <GridContent title='Followers' className='pb-10'>
            <>
              {props.user.followers?.map((follower) => {
                return (
                  <UserProfileItem
                    user={follower.follower[0]}
                    key={follower.id}
                    disabled={!props.isCurrentUser}
                  />
                );
              })}
            </>
          </GridContent>
        )}
        {isViewing === 'following' && (
          <GridContent title='Following' className='pb-10'>
            <>
              {props.user.following?.map((following) => {
                return (
                  <UserProfileItem
                    user={following.following[0]}
                    key={following.id}
                    disabled={!props.isCurrentUser}
                  />
                );
              })}
            </>
          </GridContent>
        )}
        {isViewing.includes('log') && (
          <ActivityLog
            activity_logs={props.activity_logs}
            isCurrentUser={props.isCurrentUser}
          />
        )}
      </div>
    </>
  );
}
