import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Button, FormInput, Loader } from '@components/';
import { setIsAddingLesson, setIsLoading } from '@store/lessons';
import { addLesson } from '@api/LessonApi';
import { setIsError } from '@store/category';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  word: string;
  correct_answer: string;
  choices: [];
};

export default function AddLessons(props: { category_id: number }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const state = useSelector((state: RootState) => state);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  });

  const lessonValidation = {
    word: {
      required: {
        value: true,
        message: 'Word is required.',
      },
      onChange: () => setIsInvalid(false),
    },
    correct_answer: {
      required: {
        value: true,
        message: 'A correct answer is required.',
      },
    },
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (checkChoice(data.choices)) {
      const choices = data.choices.map((choice: { name: string }) => ({
        ...choice,
        is_correct: false,
      }));

      addLesson(props.category_id, {
        word: data.word,
        choices: [{ name: data.correct_answer, is_correct: true }, ...choices],
      })
        .then((response) => {
          if (response.status === 201) {
            dispatch(setIsAddingLesson(false));
          }
        })
        .catch((error) => dispatch(setIsError(true)));
    }
  };

  const checkChoice = (choices: []) => {
    const emptyChoice = choices.find(
      (choice: { name: string }) => choice.name === ''
    );

    if (emptyChoice) {
      setErrorMsg('Choices cannot be empty.');
      return false;
    } else if (choices.length < 3) {
      setErrorMsg('The lesson must have at least 3 choices.');
      return false;
    }

    return true;
  };

  useEffect(() => {
    append({});
  }, []);

  return (
    <div className='flex-col w-4/5 mx-auto'>
      <>
        <h1 className='page-label'>Add lesson to this category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className='w-3/6 flex flex-col justify-between'>
              <FormInput
                label='Word'
                type='text'
                register={{ ...register('word', lessonValidation.word) }}
                required
                errors={errors.word}
                placeholder='ex: Valiant'
              />
              <div className='button-group w-full mt-10'>
                <Button text='Add lesson' className='button w-56 md:mr-4' />
                <button
                  className='red-button text-center md:mt-0 xs:mt-6 w-56'
                  onClick={() => dispatch(setIsAddingLesson(false))}
                  type='button'
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className='w-3/6 px-10 flex flex-col'>
              <FormInput
                label='Correct answer'
                type='text'
                register={{
                  ...register(
                    'correct_answer',
                    lessonValidation.correct_answer
                  ),
                }}
                required
                errors={errors.correct_answer}
                placeholder='ex: Courageous'
              />
              <label className='text-gray-700 text-lg mt-8 mb-0'>
                Choices:
              </label>
              {fields.map((field, index) => {
                return (
                  <div
                    className='flex justify-center items-baseline'
                    key={field.id}
                  >
                    <FormInput
                      type='text'
                      register={{
                        ...register(`choices.${index}.name`, {
                          onChange: () => setErrorMsg(''),
                        }),
                      }}
                      placeholder='Choice'
                    />
                    {index !== 0 && (
                      <button
                        className='red-button'
                        onClick={() => remove(index)}
                        type='button'
                      >
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <span className='text-sm text-red-500'>{errorMsg}</span>
              <button
                onClick={() => {
                  append({});
                }}
                type='button'
                className='button bg-purple-200 self-end mt-10'
              >
                Add choices
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}
