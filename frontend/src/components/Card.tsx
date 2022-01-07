import React from 'react';

interface CardProps {
    rounded?:boolean
    className?:string,
    children?:JSX.Element[] | JSX.Element
}


const Card = (props:CardProps) => {
  return (
    <div
      className={`mx-auto  
          bg-white border
          border-lightgray
          ${props.rounded ? 'rounded-2xl' : ''}
          ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
