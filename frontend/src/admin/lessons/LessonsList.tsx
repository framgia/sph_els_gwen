import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { Card, Modal } from '@components/';
import LessonItem from './LessonItem';
import AddLessons from './AddLessons';
import { setIsAddingLesson } from '@store/lessons';
import WarningIcon from '@icons/WarningIcon';
import AddIcon from '@icons/AddIcon';
import './index.css';

export default function LessonsList(props: { isEditable?: boolean }) {
  const state = useSelector((state: RootState) => state.lessons);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className='lessons-list-group'>
      <Modal
        isOpen={isModalOpen}
        toggleModal={(isOpen:boolean) => setIsModalOpen(isOpen)}
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
        {!state.isAddingLesson && (
          <>
            <h1 className='page-label'>Lessons in this category</h1>
            <div className='lessons-card-group'>
              {[1, 2, 3].map((index) => {
                return (
                  <LessonItem
                    key={index}
                    lesson_id={index}
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
        {state.isAddingLesson && (
          <>
            <AddLessons />
          </>
        )}
      </>
    </div>
  );
}
