import React from 'react';
import { Card } from '@components/';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAddingLesson } from '@store/lessons';

export default function LessonItem(props: {
  lesson_id?: number;
  isEditable?: boolean;
  toggleModal?: (isOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditLesson = () => {
    let currentPath = window.location.pathname;
    if (currentPath.includes('add')) {
      dispatch(setIsAddingLesson(true));
    } else {
      currentPath = currentPath.split('/edit')[0];
      navigate(`${currentPath}/lessons/${props.lesson_id}/edit`);
    }
  };

  const handleDelete = () => {
    if (props.toggleModal) {
      props.toggleModal(true);
    }
  };

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
              <h1 className='text-2xl text-purple-400 font-bold'>Valiant</h1>
            </div>
            <div className='word-group md:mt-0 xs:mt-4'>
              <h1 className='italic'>answer</h1>
              <h1 className='text-2xl text-purple-400 font-semibold'>
                Courageous
              </h1>
            </div>
          </div>
          <div
            className={`choices-group ${
              props.isEditable ? 'md:h-2/6' : 'md:h-1/2'
            }`}
          >
            <h1 className='md:text-center italic'>choices</h1>
            <div className='choices-list'>
              {['choice1', 'choice2', 'choice3'].map((item) => {
                return (
                  <h1 className='choices-item' key={item}>
                    {item}
                  </h1>
                );
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
