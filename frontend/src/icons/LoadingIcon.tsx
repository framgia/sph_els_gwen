import React from 'react'

export default function Loading() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={{
          margin: 'auto',
          //   background: 'rgb(255, 255, 255)',
          display: 'block',
          shapeRendering: 'auto',
          animationPlayState: 'running',
          animationDelay: '0s',
        }}
        width='120'
        height='120'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx={50}
          cy={50}
          fill='none'
          stroke='#581C87'
          strokeWidth={10}
          r={35}
          strokeDasharray='164.93361431346415 56.97787143782138'
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='1s'
            values='0 50 50;360 50 50'
            keyTimes='0;1'
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          />
        </circle>
      </svg>
    );
}
