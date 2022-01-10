import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { setIsInvalid } from '../../store/lessons';
import { RootState } from '../../store/store';
import { Container, FormInput } from '@components/';
import Loader from '@icons/Loader';

type Inputs = { 
  word: string;
  correct_answer: string;
  choices: [];
}

export default function AddLessons() {
  const state = useSelector((state: RootState) => state.lessons);
  const dispatch = useDispatch();
  const [cookies] = useCookies();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();

    const lessonsValidation = {
      word: {
        required: {
          value: true,
          message: 'Word is required.'
        },
        onChange: () => dispatch(setIsInvalid(false))
      },
      choices: {
        name: {
          required: {
            value: true,
            message: 'Choice name is required'
          }
        }
      }
    }

  return (
    <>
      <Container className='m-10 flex-col md:w-3/5 xs:w-4/5 mx-auto'>
        <>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && !state.isLoading && <h1>error</h1>}
          {!state.isLoading && !state.isError && (
            <>
              <h1>Add new lesson</h1>
              <form>
                <div className='flex'>
                  <div className='w-3/6 px-10'>
                    <FormInput
                      label='Word'
                      type='text'
                      register={{...register('word')}}
                      errors={errors.word}
                      required
                      placeholder='ex: Valiant'
                    />
                  </div>
                  <div className='w-3/6 px-10'>
                    <FormInput
                      label='Correct answer'
                      type='text'
                      register={{}}
                      errors={errors.name}
                      required
                      placeholder='ex: Courageous'
                    />
                    <FormInput
                      label='Choices:'
                      type='text'
                      register={{}}
                      errors={errors.name}
                      required
                      placeholder='Choice 1'
                    />
                    <FormInput
                      type='text'
                      register={{}}
                      errors={errors.name}
                      placeholder='Choice 2'
                    />
                    <FormInput
                      type='text'
                      register={{}}
                      errors={errors.name}
                      placeholder='Choice 3'
                    />
                  </div>
                </div>
              </form>
            </>
          )}
        </>
      </Container>
    </>
  );
}
