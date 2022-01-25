import React from 'react';
import { Card } from '.';

export default function Modal(props: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
  children?: JSX.Element[] | JSX.Element;
  buttonAction?: {
    buttonText?: string;
    action?: () => void;
  };
  closeButtonText?: string;
}) {
  return (
    <div
      className={`${
        props.isOpen ? 'visible' : 'invisible'
      } z-50 fixed inset-0 bg-gray-600 bg-opacity-25 overflow-y-auto h-full w-full flex flex-col items-center justify-center`}
    >
      <Card className='flex bg-white flex flex-col items-center justify-around p-12 h-96 rounded-2xl'>
        <>
          {props.children}
          <div className='flex w-4/5 justify-evenly mt-10'>
            {props.buttonAction?.buttonText && (
              <button
                className='button bg-primary w-52'
                onClick={() =>{props.buttonAction?.action && props.buttonAction?.action()}}
              >
                {props.buttonAction.buttonText}
              </button>
            )}
            <button
              className='red-button w-52'
              onClick={() => props.toggleModal(false)}
            >
              {props.closeButtonText ?? 'Cancel'}
            </button>
          </div>
        </>
      </Card>
    </div>
  );
}
