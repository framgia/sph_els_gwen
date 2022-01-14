import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
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
import { getSpecificCategory, editCategory } from '@api/CategoryApi';
import './index.css';
import LessonsList from '@admin/lessons/LessonsList';
import { setIsAddingLesson } from '@store/lessons';

type Inputs = {
  name: string;
  description: string;
};

export default function EditCategory() {
  const state = useSelector((state: RootState) => state.category);
  const [categoryItem, setCategoryItem] = useState({
    id: 0,
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category_id } = useParams<{category_id: string}>();
  const {
    register,
    handleSubmit,
    reset,
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
      required: false,
    },
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setIsLoading(true));
    if (!data.description) {
      data.description = '';
    }
    editCategory(categoryItem.id, data)
      .then((response) => {
        dispatch(setIsLoading(false));
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          dispatch(setIsInvalid(true));
        } else {
          dispatch(setIsError(true));
        }
      });
  };

  const _getSpecificCategory = (id: number) => {
    getSpecificCategory(id)
      .then((response) => {
        setCategoryItem(response.data.data);
        reset({
          name: response.data.data.name,
          description:
            response.data.data.description === 'null'
              ? ''
              : response.data.data.description,
        });
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setErrorMessage('Resource not found')
        }
        dispatch(setIsError(true));
      });
  };

  useEffect(() => {
    setIsInvalid(false);
    if (!category_id) {
      navigate('/admin/categories');
    } else {
      dispatch(setIsLoading(true));
      _getSpecificCategory(parseInt(category_id));
    }
  }, []);

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='my-10 flex-col w-full'>
        <>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && (
            <div className='flex flex-col items-center justify-center'>
              <Notification
                isSuccess={false}
                title={
                  errorMessage ??
                  'An error has occurred. Please try again later.'
                }
                errorAction={errorMessage ? 'back' : 'refresh'}
              />
            </div>
          )}
          {!state.isLoading && !state.isError && (
            <div className='flex w-full px-10'>
              <div className='flex flex-col w-1/3'>
                <h1 className='page-label'>Edit category</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                  <div className='w-full'>
                    <FormInput
                      label='Category name'
                      type='text'
                      register={{
                        ...register('name', categoryValidation.name),
                      }}
                      errors={errors.name}
                      required
                      placeholder='Choose a unique category name'
                      defaultValue={categoryItem.name}
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
                    register={{
                      ...register(
                        'description',
                        categoryValidation.description
                      ),
                    }}
                    placeholder='Add a description to give more information on this category'
                    defaultValue={categoryItem.description}
                  />
                  <div className='button-group w-full mx-auto justify-center mt-10'>
                    <Button text='Update category' className='w-56 md:mr-4' />
                    <button
                      className='red-button text-center md:mt-0 xs:mt-6 w-56'
                      onClick={() => {
                        dispatch(setIsAddingLesson(false))
                        navigate(`/admin/categories/${categoryItem.id}`);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <LessonsList category_id={categoryItem.id} isEditable={true} />
            </div>
          )}
        </>
      </Container>
    </>
  );
}
