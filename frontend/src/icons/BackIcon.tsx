import React from 'react'

export default function BackIcon(props: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0'
      y='0'
      viewBox='0 0 24 24'
      xmlSpace='preserve'
      className={props.className}
    >
      <g>
        <path
          xmlns='http://www.w3.org/2000/svg'
          d='m22 11h-17.586l5.293-5.293a1 1 0 1 0 -1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414l-5.293-5.293h17.586a1 1 0 0 0 0-2z'
          fill='#000000'
          data-original='#000000'
        ></path>
      </g>
    </svg>
  );
}
