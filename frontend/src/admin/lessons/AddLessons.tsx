import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Button, FormInput } from '@components/';
import { getLessons, setIsAddingLesson, setIsLoading } from '@store/lessons';
import { getChoices } from '@store/choices';
import { addChoices, addLesson } from '@api/LessonApi';
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
    dispatch(setIsLoading(true));
    if (checkChoices(data.choices)) {
      const newLessonId = await addLesson(props.category_id, {
        word: data.word,
      })
        .then((response) => response.data.data.id)
        .catch((error) => 0);

      const choices = data.choices.map(
        (choice: { name: string; is_correct: boolean }) => ({
          ...choice,
          is_correct: false,
        })
      );
      const payload = [
        { name: data.correct_answer, is_correct: true },
        ...choices,
      ];
      payload.forEach((choice) => {
        addChoices(newLessonId, choice)
          .then((response) => {
            if (response.status === 200) {
              dispatch(setIsLoading(false));
              navigate(`/admin/categories/${props.category_id}/edit`);
            }
          })
          .catch((error) => dispatch(setIsError(true)));
      });
      dispatch(setIsAddingLesson(false));
    }
  };

  const checkChoices = (choices: []) => {
    //check if choices added are empty
    const emptyChoice = choices.find(
      (choice: { name: string }) => choice.name === ''
    );
    emptyChoice ? setErrorMsg('Choices cannot be empty.') : setErrorMsg('');
    //check if choices are less than 3
    if (choices.length < 3) {
      setErrorMsg('The lesson must have at least 3 choices.');
    } else {
      return true;
    }
    return false;
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
                      register={{ ...register(`choices[${index}].name`) }}
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
