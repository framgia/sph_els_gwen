import React from 'react';
import { useCookies } from 'react-cookie';
import { Card } from '@components/';
import { ActivityLogResponse } from '@store/user';
import { UserIcon } from '@icons/';

export default function ActivityLogItem({ log }: { log: ActivityLogResponse }) {
  const [cookies, _] = useCookies();

  return (
    <Card
      key={log.log_id}
      className='flex justify-evenly mb-5 p-3 items-center border-gray-400 rounded-xl'
    >
      <UserIcon className='md:w-20 xs:w-12' />
      <div className='flex flex-col md:w-9/12 xs:w-7/12'>
        <span className='md:text-xl font-semibold'>
          {log.user?.id === cookies.user['id'] ? 'You' : log.user?.name}
        </span>
        <span className='md:text-lg xs:text-sm capitalize'>
          {log.words_count &&
            `Learned ${log.words_learned} out of ${
              log.words_count
            } words in ${log.category?.name.slice(1, 10)}...`}
          {log.follower &&
            `Followed ${
              log.follower.id === cookies.user['id'] ? 'you' : log.follower.name
            }`}
        </span>
      </div>
      <span className='md:text-lg xs:text-sm'>{log.date}</span>
    </Card>
  );
}
