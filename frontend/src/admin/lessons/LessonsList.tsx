import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddIcon, WarningIcon } from '@icons/';
import { Card, Modal, Loader } from '@components/';
import LessonItem from './LessonItem';
import AddLessons from './AddLessons';

import { getAllLessons } from '@api/LessonApi';

import { RootState } from '@store/store';
import { getLessons, setIsAddingLesson, setIsLoading } from '@store/lessons';
import './index.css';

export default function LessonsList(props: {
  category_id?: number;
  isEditable?: boolean;
}) {
  const state = useSelector((state: RootState) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const _getLessons = () => {
    dispatch(setIsLoading(true));
    if (props.category_id) {
      getAllLessons(props.category_id)
        .then((response) => {
          console.log(1);
          
          dispatch(getLessons(response.data.data));
          console.log(2);
          
          dispatch(setIsLoading(false));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    _getLessons();
  }, []);

  return (
    <>
      <div
        className={`lessons-list-group ${
          props.isEditable ? 'md:w-2/3 xs:w-full' : 'w-full'
        }`}
      >
        <Modal
          isOpen={isModalOpen}
          toggleModal={(isOpen: boolean) => setIsModalOpen(isOpen)}
          buttonAction={{
            buttonText: 'Yes, delete this lesson',
            action: () => {},
          }}
        >
          <WarningIcon className='w-32 text-red-300' />
          <h1 className='text-3xl font-semibold'>
            Are you sure you want to delete this lesson?
          </h1>
        </Modal>
        <>
          {!state.lessons.isAddingLesson && (
            <>
              <h1 className='page-label'>Lessons in this category</h1>
              <div className='lessons-card-group'>
                {!state.lessons.isLoading && state.lessons.lessons.map((lesson) => {
                  console.log('lessons');                  
                  return (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      isEditable={props.isEditable}
                      toggleModal={(isOpen: boolean) => setIsModalOpen(isOpen)}
                    />
                  );
                })}
                {props.isEditable && (
                  <button onClick={() => dispatch(setIsAddingLesson(true))}>
                    <Card className='add-lesson-card'>
                      <AddIcon className='w-16 text-secondary' />
                    </Card>
                  </button>
                )}
              </div>
            </>
          )}
          {state.lessons.isAddingLesson && (
            <>
              <AddLessons />
            </>
          )}
        </>
      </div>
    </>
  );
}
