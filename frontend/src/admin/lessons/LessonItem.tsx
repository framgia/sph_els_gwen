import React, { useState, useEffect } from 'react';
import { Card, Loader } from '@components/';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllChoices } from '@api/LessonApi';

import { RootState } from '@store/store';
import { Lesson, setIsAddingLesson } from '@store/lessons';
import { Choice, getChoices } from '@store/choices';

export default function LessonItem(props: {
  lesson: {
    id: number;
    word: string;
    category_id?: number;
  };
  isEditable?: boolean;
  toggleModal?: (isOpen: boolean, id: number) => void;
}) {
  const state = useSelector((state: RootState) => state);

  const [lessonChoices, setLessonChoices] = useState([
    {
      answer: [],
      other_choices: [],
    },
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditLesson = () => {
    let currentPath = window.location.pathname;
    if (currentPath.includes('add')) {
      dispatch(setIsAddingLesson(true));
    } else {
      currentPath = currentPath.split('/edit')[0];
      navigate(`${currentPath}/lessons/${props.lesson.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (props.toggleModal) {
      props.toggleModal(true, props.lesson.id);
    }
  };

  const _getChoices = () => {
    getAllChoices(props.lesson.id)
      .then((response) => {
        const choices = response.data.data;
        dispatch(getChoices(response.data.data));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    _getChoices();
  }, []);

  return (
    <Card className='lesson-item-card'>
      <>
        <div className='flex md:flex-col'>
          <div
            className={`word-answer-group ${
              props.isEditable ? 'h-2/6' : 'h-1/2'
            }`}
          >
            <div className='word-group'>
              <h1 className='italic'>word</h1>
              <h1 className='text-2xl text-purple-400 font-bold'>
                {props.lesson.word}
              </h1>
            </div>
            <div className='word-group md:mt-0 xs:mt-4'>
              <h1 className='italic'>answer</h1>
              {state.choices.choices.map((choice) => {
                if (choice.lesson_id === props.lesson.id && choice.is_correct) {
                  return (
                    <h1
                      className='text-2xl text-purple-400 font-semibold'
                      key={choice.id}
                    >
                      {choice.name}
                    </h1>
                  );
                }
              })}
            </div>
          </div>
          <div
            className={`choices-group ${
              props.isEditable ? 'md:h-2/6' : 'md:h-1/2'
            }`}
          >
            <h1 className='md:text-center italic'>choices</h1>
            <div className='choices-list'>
              {state.choices.choices.map((choice) => {
                if (
                  choice.lesson_id === props.lesson.id &&
                  !choice.is_correct
                ) {
                  return <h1 className='choices-item' key={choice.id}>{choice.name}</h1>;
                }
              })}
            </div>
          </div>
        </div>
        {props.isEditable && (
          <div className='lesson-item-buttons'>
            <button
              onClick={handleEditLesson}
              className='button bg-purple-200 md:mr-4'
            >
              Edit lesson
            </button>
            <button className='red-button text-center' onClick={handleDelete}>
              Delete lesson
            </button>
          </div>
        )}
      </>
    </Card>
  );
}
