import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/';
import '@components/index.css';

export default function CategoryItem(props: {
  id: number;
  name: string;
  description: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Card className='category-item-card'>
      <div className='md:w-full xs:w-3/4 md:mr-0 xs:mr-10 flex-grow'>
        <h1 className='md:text-2xl xs:text-xl font-medium'>{props.name}</h1>
        <p className='mt-3'>
          {props.description === 'null' ? (
            <p className='italic text-sm text-gray-400'>
              No description provided
            </p>
          ) : (
            <p>
              {props.description.length < 20
                ? props.description
                : `${
                    props.description.charAt(0).toUpperCase() +
                    props.description.slice(1, 20)
                  }...`}
            </p>
          )}
        </p>
      </div>
      <div className='button-group xs:w-1/4 md:mt-10'>
        <Link
          to={`/admin/categories/${props.id}`}
          className='button bg-purple-200 md:w-28 xs:w-full text-center md:mr-2'
        >
          View
        </Link>
        <Link
          to={`/categories/${props.id}/delete`}
          className='red-button md:w-28 xs:w-full text-center md:mt-0 xs:mt-5'
        >
          Delete
        </Link>
      </div>
    </Card>
  );
}
