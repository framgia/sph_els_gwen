import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@icons/';
import { User } from '@store/user';

export default function UserInfo(props: {
  user?: User;
  followers?: number;
  following?: number;
  setIsViewing: (view: string) => void;
  children?: JSX.Element;
}) {
  const navigate = useNavigate();

  return (
    <aside className='side-content'>
      <button
        className='button bg-primary self-start ml-7 border'
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <div className='user-info-group'>
        <div className='user-name-group'>
          <UserIcon className='md:w-36 xs:w-20' />
          <div className='flex flex-col justify-center md:items-center'>
            <span className='md:text-2xl xs:text-xl font-bold'>
              {props.user?.name}
            </span>
            <span className='text-xl'>{props.user?.email}</span>
          </div>
        </div>
        {props.children}
        <div className='buttons-grid'>
          <button className='following-button'>
            <span className='following-button-text'>150</span>
            words learned
          </button>
          <button className='following-button'>
            <span className='following-button-text'>20</span>
            lessons taken
          </button>
          <button
            className='following-button hover:bg-purple-200'
            onClick={() => props.setIsViewing('followers')}
          >
            <span className='following-button-text'>{props.followers}</span>
            followers
          </button>
          <button
            className='following-button hover:bg-purple-200'
            onClick={() => props.setIsViewing('following')}
          >
            <span className='following-button-text'>{props.following}</span>
            following
          </button>
        </div>
      </div>
      <div className='other-button-group'>
        <button
          className='activity-log-button'
          onClick={() => props.setIsViewing('Activity log')}
        >
          View activity log
        </button>
        <button
          className='py-3 md:block xs:hidden text-lg w-full hover:bg-primary'
          onClick={() => props.setIsViewing('profile settings')}
        >
          Profile Settings
        </button>
      </div>
    </aside>
  );
}
