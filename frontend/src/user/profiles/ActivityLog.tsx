import React, { useEffect, useState } from 'react';
import { Card } from '@components/';
import { UserIcon } from '@icons/';
import { ActivityLogResponse } from '@store/user';
import { useCookies } from 'react-cookie';
import ActivityLogItem from './ActivityLogItem';

export default function ActivityLog(props: {
  activity_logs?: ActivityLogResponse[];
  isCurrentUser?: boolean;
}) {
  const [isViewing, setIsViewing] = useState('All');
  const [cookies, _] = useCookies();
  const user_logs = props.activity_logs?.filter((log) => {
    return log.user?.id === cookies.user['id'];
  });
  const following_logs = props.activity_logs?.filter((log) => {
    return log.user?.id !== cookies.user['id'];
  });

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
                    key={element}
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
            {/* show all activity logs if currently viewing all */}
            {isViewing === 'All' &&
              props.activity_logs?.map((log) => {
                return <ActivityLogItem log={log} />;
              })}
            {/* show only user activity logs if currently viewing mine */}
            {isViewing === 'Mine' &&
              user_logs?.map((log) => {
                return <ActivityLogItem log={log} />;
              })}
            {/* show only activity logs of users that current user is following if currently viewing following */}
            {isViewing === 'Following' &&
              following_logs?.map((log) => {
                return <ActivityLogItem log={log} />;
              })}
          </div>
        </>
      </Card>
    </>
  );
}
