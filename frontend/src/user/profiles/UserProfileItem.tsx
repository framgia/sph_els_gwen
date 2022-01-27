import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@components/';
import { FollowingRecord, User } from '@store/user';
import { UserIcon } from '@icons/';
import { Link } from 'react-router-dom';
import { followUser } from '@api/UserApi';
import { useCookies } from 'react-cookie';
import { setIsError, setIsLoading } from '@store/category';

export default function UserProfileItem(props: {
  user: User;
  toggleModal?: (isOpen: boolean, id: number, isFollowUser: boolean) => void;
  disabled?: boolean;
}) {
  const dispatch = useDispatch();

  const [cookies, _] = useCookies();
  const user_following = JSON.parse(
    localStorage.getItem('user_following') || '{}'
  );
  const isFollowing = user_following.find((following: FollowingRecord) => {
    return following.following[0].id === props.user.id;
  });

  const handleFollowUser = () => {
    if (!isFollowing) {
      dispatch(setIsLoading(true));
      followUser(cookies.user['id'], { following_id: props.user.id })
        .then((response) => {
          if (response.status === 201) {
            dispatch(setIsLoading(false));
            props.toggleModal && props.toggleModal(true, 0, true);
          }
        })
        .catch((error) => dispatch(setIsError(false)));
    } else {
      props.toggleModal && props.toggleModal(true, props.user.id, false);
    }
  };

  return (
    <Card className='category-item-card border-gray-400 mx-auto'>
      <div className='flex flex-col items-center w-full h-full justify-between'>
        {props.disabled && isFollowing && (
          <span className='bg-secondary text-white px-3 rounded-full self-end'>
            following
          </span>
        )}
        <UserIcon />
        <p className='md:text-2xl xs:text-xl font-medium text-center'>
          {props.user.name}
        </p>
        <Link
          to={`/users/${props.user.id}`}
          className='button bg-primary mt-7 w-60 text-center'
        >
          View this user's profile
        </Link>
        {!props.disabled && (
          <button
            className={`button mt-3 w-60 text-center ${
              isFollowing ? 'bg-secondary text-white' : 'bg-primary'
            }`}
            onClick={handleFollowUser}
          >
            {isFollowing ? 'Following' : 'Follow this user'}
          </button>
        )}
      </div>
    </Card>
  );
}
