import React from 'react';

interface CardProps {
    rounded?:boolean
    className:string,
    children?:JSX.Element[]
}


const Card = (props:CardProps) => {
  return (
    <div
      className={`mx-auto  
          shadow-lg bg-white border
          border-lightgray
          ${props.rounded ? 'rounded-2xl' : ''}
          ${props.className}
          ${props.className.includes('p-') ?? ''}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
