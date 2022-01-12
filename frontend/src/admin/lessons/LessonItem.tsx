import React, { useState, useEffect } from 'react';
import { Card, Loader } from '@components/';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { Lesson, Choice, setIsAddingLesson } from '@store/lessons';

export default function LessonItem(props: {
  lesson: Lesson;
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
  const answer = props.lesson.choices.find((choice:Choice) => (choice.is_correct));

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
    state.lessons.lessons.forEach((lesson) => {
      console.log('hello');
      // getAllChoices(lesson.id)
      //   .then((response) => {
      //     const choices = response.data.data;
      //     dispatch(getChoices(response.data.data));

      //     //getting choices of specific lesson
      //     const _correct_answer = choices.filter((choice: Choice) => {
      //       if (choice.lesson_id === lesson.id) {
      //         return choice;
      //       }
      //     });
      //     // console.log(_correct_answer);

      //     // setLessonChoices({...lessonChoices, answer: {..._correct_answer}});
      //   })
      //   .catch((error) => console.error(error));
    });
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
              <span className='italic'>word</span>
              <span className='text-2xl text-purple-400 font-bold'>
                {props.lesson.word}
              </span>
            </div>
            <div className='word-group md:mt-0 xs:mt-4'>
              <span className='italic'>answer</span>
              <span
                className='text-2xl text-purple-400 font-semibold'
                key={answer?.id}
              >
                {answer?.name}
              </span>
            </div>
          </div>
          <div
            className={`choices-group ${
              props.isEditable ? 'md:h-2/6' : 'md:h-1/2'
            }`}
          >
            <span className='md:text-center italic'>choices</span>
            <div className='choices-list'>
              {props.lesson.choices.map((choice) => {
                return (
                  <span className='choices-item' key={choice.id}>
                    {choice.name}
                  </span>
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
