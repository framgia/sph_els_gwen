import React from 'react';
import { Nav, Container, FormInput, Button } from '@components/';
import { Link } from 'react-router-dom';

export default function EditLesson() {
  const currentPath = window.location.pathname;

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='p-10 w-full'>
        <>
          <div className='flex w-full justify-evenly'>
            <div className='flex flex-col w-1/3'>
              <h1 className='page-label'>Category Details</h1>
              <div className='w-full'>
                <FormInput
                  label='Category name:'
                  type='text'
                  disabled={true}
                  required
                  defaultValue='Current title here'
                />
              </div>
              <FormInput
                label='Description:'
                type='textarea'
                disabled={true}
                defaultValue='Current description here'
              />
            </div>
            <div className='flex flex-col w-2/3 mx-10'>
              <h1 className='page-label'>Edit lesson in this category</h1>
              <form>
                <div className='flex'>
                  <div className='w-3/6'>
                    <FormInput
                      label='Word'
                      type='text'
                      register={{}}
                      required
                      defaultValue='Previous word here'
                    />
                  </div>
                  <div className='w-3/6 px-10'>
                    <FormInput
                      label='Correct answer'
                      type='text'
                      register={{}}
                      required
                      defaultValue='Previous correct answer here'
                    />
                    <FormInput
                      label='Choices:'
                      type='text'
                      register={{}}
                      required
                      defaultValue='Previous choice 1 name here'
                    />
                    <FormInput
                      type='text'
                      register={{}}
                      defaultValue='Previous choice 1 name here'
                    />
                    <FormInput
                      type='text'
                      register={{}}
                      defaultValue='Previous choice 1 name here'
                    />
                  </div>
                </div>
              </form>
              <div className='button-group w-full mx-auto justify-center mt-10'>
                <Button text='Update lesson' className='w-56 md:mr-4' />
                <Link
                  to={ `${currentPath.split('/lessons')[0]}/edit`}
                  className='red-button text-center md:mt-0 xs:mt-6 w-56'
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </>
      </Container>
    </>
  );
}
