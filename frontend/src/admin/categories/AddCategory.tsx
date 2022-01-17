import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  Container,
  FormInput,
  Button,
  Loader,
  Notification,
} from '@components/';
import { setIsInvalid, setIsLoading, setIsError } from '@store/category';
import { RootState } from '@store/store';
import { addCategory } from '@api/CategoryApi';
import './index.css';

type Inputs = {
  name: string;
  description: string;
};

export default function AddCategory() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const categoryValidation = {
    name: {
      required: {
        value: true,
        message: 'Category name is required.',
      },
      onChange: () => dispatch(setIsInvalid(false)),
    },
    description: {},
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setIsLoading(true));
    if (!data.description) {
      data.description = '';
    }
    addCategory(data)
      .then((response) => {
        dispatch(setIsLoading(false));
        navigate(`/admin/categories/${response.data.data.id}`);
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          dispatch(setIsInvalid(true));
        } else {
          dispatch(setIsError(true));
        }
      });
  };

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='p-10 w-full'>
        <>
          {state.category.isLoading && !state.category.isError && <Loader />}
          {state.category.isError && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {!state.category.isLoading && !state.category.isError && (
            <div className='flex md:flex-row xs:flex-col w-full justify-evenly'>
              <div className='flex flex-col md:w-1/3 xs:w-full items-center'>
                <h1 className='page-label'>Add new category</h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='w-full h-full'
                >
                  <div className='w-full'>
                    <FormInput
                      label='Category name'
                      type='text'
                      register={{
                        ...register('name', categoryValidation.name),
                      }}
                      errors={errors.name}
                      disabled={state.words.isAddingWord}
                      required
                      placeholder='Choose a unique category name'
                    />
                    {state.category.isInvalid && (
                      <span className='text-red-500 text-sm text-center'>
                        Category name has already been taken.
                      </span>
                    )}
                  </div>
                  <FormInput
                    label='Description'
                    type='textarea'
                    register={{
                      ...register(
                        'description',
                        categoryValidation.description
                      ),
                    }}
                    disabled={state.words.isAddingWord}
                    placeholder='Add a description to give more information on this category'
                  />
                  {!state.words.isAddingWord && (
                    <div className='button-group w-full mx-auto justify-center mt-20'>
                      <Button text='Save category' className='w-56 md:mr-4' />
                      <Link
                        to='/admin/dashboard'
                        className='red-button text-center md:mt-0 xs:mt-6 w-56'
                      >
                        Cancel
                      </Link>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </>
      </Container>
    </>
  );
}
