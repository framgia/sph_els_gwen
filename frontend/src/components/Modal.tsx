import React from 'react';
import { Card, Button } from '.';
import Warning from './Warning';

export default function Modal(props: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
  deleteCategory: () => void;
}) {
  return (
    <div
      className={`${
        props.isOpen ? 'visible' : 'invisible'
      } z-50 fixed inset-0 bg-gray-600 bg-opacity-25 overflow-y-auto h-full w-full flex flex-col items-center justify-center`}
    >
      <div className=''>
        <Card className='flex bg-white flex flex-col items-center justify-around p-12 h-96 rounded-2xl'>
          <Warning className='w-32 text-red-300' />
          <div>
            <h1 className='text-3xl font-semibold'>
              Are you sure you want to delete this category?
            </h1>
          </div>

          <div className='flex w-4/5 justify-evenly mt-10'>
            <button
              className='button bg-purple-200'
              onClick={() => props.deleteCategory()}
            >
              Yes, delete this category
            </button>
            <button
              className='red-button w-52'
              onClick={() => props.toggleModal(false)}
            >
              Cancel
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
