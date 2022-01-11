import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormInput } from '@components/';
import { setIsAddingLesson } from '@store/lessons';

export default function AddLessons() {
  const dispatch = useDispatch();

  return (
    <div className='flex-col w-4/5 mx-auto'>
      <>
        <h1 className='page-label'>Add lesson to this category</h1>
        <form>
          <div className='flex'>
            <div className='w-3/6'>
              <FormInput
                label='Word'
                type='text'
                register={{}}
                required
                placeholder='ex: Valiant'
              />
            </div>
            <div className='w-3/6 px-10'>
              <FormInput
                label='Correct answer'
                type='text'
                register={{}}
                required
                placeholder='ex: Courageous'
              />
              <FormInput
                label='Choices:'
                type='text'
                register={{}}
                required
                placeholder='Choice 1'
              />
              <FormInput type='text' register={{}} placeholder='Choice 2' />
              <FormInput type='text' register={{}} placeholder='Choice 3' />
            </div>
          </div>
        </form>
        <div className='button-group w-full mx-auto justify-center mt-10'>
          <Button text='Add lesson' className='w-56 md:mr-4' />
          <button
            className='red-button text-center md:mt-0 xs:mt-6 w-56'
            onClick={() => dispatch(setIsAddingLesson(false))}
          >
            Cancel
          </button>
        </div>
      </>
    </div>
  );
}
