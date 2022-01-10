import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
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
  const state = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
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
    description: {
      
    },
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setIsLoading(true));    
    if (!data.description) {
      data.description = 'null';
    }    
    addCategory(cookies.admin_token, data)
      .then((response) => {
        dispatch(setIsLoading(false));
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          dispatch(setIsInvalid(true));
        } else {
          console.log(error);
          dispatch(setIsError(true));
        }
      });
  };

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='m-10 flex-col md:w-3/5 xs:w-4/5 mx-auto'>
        <>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && (
            <div className='flex flex-col w-full h-96 items-center justify-center'>
              <Notification
                isSuccess={false}
                title='An error has occurred. Please try again later.'
                errorAction='refresh'
              />
            </div>
          )}
          {!state.isLoading && !state.isError && (
            <>
              <h1 className='page-label'>Add new category</h1>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <div className='w-full'>
                  <FormInput
                    label='Category name'
                    type='text'
                    register={{ ...register('name', categoryValidation.name) }}
                    errors={errors.name}
                    required
                    placeholder='Choose a unique category name'
                  />
                  {state.isInvalid && (
                    <span className='text-red-500 text-sm text-center'>
                      Category name has already been taken.
                    </span>
                  )}
                </div>
                <FormInput
                  label='Description'
                  type='textarea'
                  register={{ ...register('description', categoryValidation.description) }}
                  placeholder='Add a description to give more information on this category'
                />
                <div className='button-group w-full mx-auto justify-center mt-10'>
                  <Button text='Save category' className='w-56 md:mr-4' />
                  <Link
                    to='/admin/dashboard'
                    className='red-button text-center md:mt-0 xs:mt-6 w-56'
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </>
          )}
        </>
      </Container>
    </>
  );
}
