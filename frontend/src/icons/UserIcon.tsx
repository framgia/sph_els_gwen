import React from 'react';

export default function UserIcon(props: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0'
      y='0'
      viewBox='0 0 32 32'
      xmlSpace='preserve'
      className={props.className ?? 'w-28'}
    >
      <g>
        <g xmlns='http://www.w3.org/2000/svg' id='Layer_2' data-name='Layer 2'>
          <path
            d='m16 17a6 6 0 1 1 6-6 6 6 0 0 1 -6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0 -4-4z'
            fill='#88888A'
            data-original='#000000'
          ></path>
          <path
            d='m16 31a15 15 0 0 1 -11.59-5.49l-.52-.64.52-.63a15 15 0 0 1 23.18 0l.52.63-.52.64a15 15 0 0 1 -11.59 5.49zm-9.49-6.12a13 13 0 0 0 19 0 13 13 0 0 0 -19 0z'
            fill='#88888A'
            data-original='#000000'
          ></path>
          <path
            d='m16 31a15 15 0 1 1 11.59-5.49 15 15 0 0 1 -11.59 5.49zm0-28a13 13 0 1 0 13 13 13 13 0 0 0 -13-13z'
            fill='#88888A'
            data-original='#000000'
          ></path>
          <path
            d='m5.18 24.88s10.07 11.25 20.32 1.12l1.32-1.12s-8.56-8.88-17.25-3.55z'
            fill='#88888A'
            data-original='#000000'
          ></path>
          <circle
            cx='16'
            cy='11'
            r='5'
            fill='#88888A'
            data-original='#000000'
          ></circle>
        </g>
      </g>
    </svg>
  );
}
