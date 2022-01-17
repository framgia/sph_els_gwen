import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
import WordsList from '@admin/words/WordsList';
import { setIsAddingWord } from '@store/words';

type Inputs = {
  name: string;
  description: string;
};

export default function EditCategory() {
  const state = useSelector((state: RootState) => state);
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
  const { category_id } = useParams<{ category_id: string }>();
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
          setErrorMessage('Resource not found');
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
  }, [state.words.isAddingWord]);

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='my-10 flex-col w-full'>
        <>
          {state.category.isLoading && !state.category.isError && <Loader />}
          {state.category.isError && (
            <div className='flex flex-col items-center justify-center'>
              <Notification
                isSuccess={false}
                title={
                  errorMessage === ''
                    ? 'An error has occurred. Please try again later.'
                    : errorMessage
                }
                errorAction={errorMessage ? 'back' : 'refresh'}
              />
            </div>
          )}
          {!state.category.isLoading && !state.category.isError && (
            <div className='flex lg:flex-row xs:flex-col w-full px-10'>
              <div className='flex flex-col lg:w-1/3 xs:w-full mb-10'>
                <h1 className='page-label text-center'>Edit category</h1>
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
                      disabled={state.words.isAddingWord}
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
                    placeholder='Add a description to give more information on this category'
                    defaultValue={categoryItem.description}
                    disabled={state.words.isAddingWord}
                  />
                  {!state.words.isAddingWord && (
                    <div className='flex items-center justify-center w-full mx-auto mt-10'>
                      <Button text='Update category' className='w-56 md:mr-4' />
                      <button
                        className='red-button text-center w-56'
                        onClick={() => {
                          dispatch(setIsAddingWord(false));
                          navigate(`/admin/categories/${categoryItem.id}`);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <WordsList category_id={categoryItem.id} isEditable={true} />
            </div>
          )}
        </>
      </Container>
    </>
  );
}
