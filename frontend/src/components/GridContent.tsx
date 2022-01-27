import React from 'react';

export default function GridContent(props: {
  title: string;
  children: JSX.Element;
  className?: string;
}) {
  return (
    <>
      <h1 className='md:text-3xl xs:text-xl font-bold mb-8'>{props.title}</h1>
      <div
        className={`grid ${
          props.className?.includes('grid')
            ? props.className
            : 'xl:grid-cols-4 md:grid-cols-2 gap-7'
        }`}
      >
        {props.children}
      </div>
    </>
  );
}
