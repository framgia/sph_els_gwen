import React, { useState } from 'react';
import { Card } from '@components/';
import { UserIcon } from '@icons/';

export default function ActivityLog(props: { isCurrentUser?: boolean }) {
  const [isViewing, setIsViewing] = useState('All');

  return (
    <>
      <h1 className='md:text-3xl xs:text-xl font-bold'>Activity Logs</h1>
      <Card className='flex flex-col my-4 border-gray-400 w-10/12'>
        <>
          {props.isCurrentUser && (
            <div className='flex w-full divide-x divide-gray-400 border-b border-gray-400'>
              {['All', 'Mine', 'Following'].map((element) => {
                return (
                  <button
                    className={`w-1/3 py-2 md:text-base xs:text-sm ${
                      element === isViewing
                        ? 'bg-primary'
                        : 'hover:bg-secondary hover:text-white'
                    }`}
                    onClick={() => setIsViewing(element)}
                  >
                    {element}
                  </button>
                );
              })}
            </div>
          )}
          <span className='bg-purple-200 py-2 pl-5 md:text-base xs:text-sm'>
            {isViewing === 'All' && 'All activity logs'}
            {isViewing === 'Mine' && 'My activity logs'}
            {isViewing === 'Following' &&
              `Activity logs of users I'm following`}
          </span>
          <div className='md:m-8 xs:m-5'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
              return (
                <Card className='flex justify-evenly mb-5 p-3 items-center border-gray-400 rounded-xl'>
                  <UserIcon className='md:w-20 xs:w-12' />
                  <div className='flex flex-col md:w-9/12 xs:w-7/12'>
                    <span className='md:text-xl font-semibold'>John Smith</span>
                    <span className='md:text-lg xs:text-sm'>
                      Learned 20 words
                    </span>
                  </div>
                  <span className='md:text-lg xs:text-sm'>25 Jan 2022</span>
                </Card>
              );
            })}
          </div>
        </>
      </Card>
    </>
  );
}
