import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Nav, Container, FormInput, Button, Loader } from '@components/';
import { setIsError, setIsLoading } from '@store/category';
import { RootState } from '@store/store';
import { getSpecificWord, updateWord } from '@api/WordApi';
import { getSpecificCategory } from '@api/CategoryApi';

type Inputs = {
  id: number;
  word: string;
  correct_answer: [];
  choices: [];
};

export default function EditWord() {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [errorMsg, setErrorMsg] = useState('');
  const [categoryItem, setCategoryItem] = useState({
    id: 0,
    name: '',
    description: '',
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { category_id, word_id } = useParams();
  const dispatch = useDispatch();

  const _getSpecificCategory = (category_id: number) => {
    getSpecificCategory(category_id)
      .then((response) => {
        setCategoryItem(response.data.data);
      })
      .catch(() => {
        dispatch(setIsError(true));
      });
  };

  const _getSpecificWord = (word_id: number) => {
    getSpecificWord(word_id)
      .then((response) => {
        const { choices, id, word } = response.data.data;
        reset({
          id: id,
          word: word,
          correct_answer: choices.filter(
            (choice: { name: string; is_correct: boolean }) => choice.is_correct
          ),
          choices: choices.filter(
            (choice: { name: string; is_correct: boolean }) =>
              !choice.is_correct
          ),
        });
        dispatch(setIsLoading(false));
      })
      .catch(() => {
        dispatch(setIsError(true));
      });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const emptyChoice = data.choices.find(
      (choice: { name: string }) => choice.name === ''
    );
    if (emptyChoice) {
      setErrorMsg('Choices cannot be empty');
    } else {
      setErrorMsg('');
      updateWord(data.id, {
        word: data.word,
        choices: [...data.choices, ...data.correct_answer],
      })
        .then((response) => {
          if (response.status===200) {
            navigate(`/admin/categories/${categoryItem.id}/edit`);
          }
        })
        .catch((error) => dispatch(setIsError(true)));
    }
  };

  useEffect(() => {
    if (category_id && word_id) {
      dispatch(setIsLoading(true));
      _getSpecificCategory(parseInt(category_id));
      _getSpecificWord(parseInt(word_id));
    }
  }, []);

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='p-10 w-full'>
        <>
          {state.category.isLoading && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <span>error</span>
          )}
          {!state.category.isLoading && !state.category.isLoading && (
            <div className='flex w-full justify-evenly'>
              <div className='flex flex-col w-1/3'>
                <h3 className='page-label'>Category Details</h3>
                <div className='w-full'>
                  <FormInput
                    label='Category name:'
                    type='text'
                    disabled={true}
                    required
                    defaultValue={categoryItem?.name}
                  />
                </div>
                <FormInput
                  label='Description:'
                  type='textarea'
                  disabled={true}
                  defaultValue={categoryItem?.description}
                />
              </div>
              <div className='flex flex-col w-2/3 mx-10'>
                <h1 className='page-label'>Edit word in this category</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex'>
                    <div className='w-3/6'>
                      <FormInput
                        label='Word:'
                        type='text'
                        register={{
                          ...register('word', {
                            required: {
                              value: true,
                              message: 'Word is required.',
                            },
                          }),
                        }}
                        errors={errors.word}
                        required
                      />
                    </div>
                    <div className='w-3/6 px-10'>
                      <FormInput
                        label='Correct answer:'
                        type='text'
                        register={{
                          ...register('correct_answer.0.name'),
                        }}
                        required
                      />
                      <div className='mt-8'>
                        <label className='input-label'>
                          Choices: <span className='text-red-500'>*</span>
                        </label>
                        <FormInput
                          type='text'
                          register={{
                            ...register('choices.0.name', {
                              onChange: () => setErrorMsg(''),
                            }),
                          }}
                        />
                        <FormInput
                          type='text'
                          register={{
                            ...register('choices.1.name', {
                              onChange: () => setErrorMsg(''),
                            }),
                          }}
                        />
                        <FormInput
                          type='text'
                          register={{
                            ...register('choices.2.name', {
                              onChange: () => setErrorMsg(''),
                            }),
                          }}
                        />
                        {errorMsg && <span className='error'>{errorMsg}</span>}
                      </div>
                    </div>
                  </div>
                  <div className='button-group w-full mx-auto justify-center mt-10'>
                    <Button text='Update word' className='w-56 md:mr-4' />
                    <Link
                      to={`${currentPath.split('/words')[0]}/edit`}
                      className='red-button text-center md:mt-0 xs:mt-6 w-56'
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      </Container>
    </>
  );
}
