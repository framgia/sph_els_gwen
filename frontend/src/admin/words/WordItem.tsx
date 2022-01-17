import React from 'react';
import { Card } from '@components/';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Word, Choice, setIsAddingWord } from '@store/words';

export default function WordItem(props: {
  word: Word;
  isEditable?: boolean;
  toggleModal?: (isOpen: boolean, id: number) => void;
}) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answer = props.lesson.choices.find((choice:Choice) => (choice.is_correct));

  const handleEditWord = () => {
    let currentPath = window.location.pathname;
    if (currentPath.includes('add')) {
      dispatch(setIsAddingWord(true));
    } else {
      currentPath = currentPath.split('/edit')[0];
      navigate(`${currentPath}/words/${props.word.id}/edit`);
    }
  };

  const handleDeleteWord = () => {
    if (props.toggleModal) {
      props.toggleModal(true, props.word.id);
    }
  };

  return (
    <Card className='word-item-card'>
      <>
        <div className='flex md:flex-col'>
          <div
            className={`word-answer-group ${
              props.isEditable ? 'h-2/6' : 'h-1/2'
            }`}
          >
            <div className='word-group'>
              <span className='italic'>word</span>
<<<<<<< HEAD
              <span className='text-2xl text-purple-400 font-bold'>
<<<<<<< HEAD:frontend/src/admin/lessons/LessonItem.tsx
                {props.lesson.word}
=======
=======
              <span className='md:text-2xl text-purple-400 font-bold'>
>>>>>>> 85c4ce5 (made components to be responsive)
                {props.word.word}
>>>>>>> 5b641f4 (changed filenames and terms to words in frontend side):frontend/src/admin/words/WordItem.tsx
              </span>
            </div>
            <div className='word-group md:mt-0 xs:mt-4'>
              <span className='italic'>answer</span>
<<<<<<< HEAD:frontend/src/admin/lessons/LessonItem.tsx
              <span
                className='text-2xl text-purple-400 font-semibold'
                key={answer?.id}
              >
                {answer?.name}
              </span>
=======
              {props.word.choices.map((choice: Choice) => {
                if (choice.is_correct) {
                  return (
                    <span
                      className='md:text-2xl text-purple-400 font-semibold'
                      key={choice.id}
                    >
                      {choice.name}
                    </span>
                  );
                }
              })}
>>>>>>> 5b641f4 (changed filenames and terms to words in frontend side):frontend/src/admin/words/WordItem.tsx
            </div>
          </div>
          <div
            className={`choices-group ${
              props.isEditable ? 'md:h-2/6' : 'md:h-1/2'
            }`}
          >
            <span className='md:text-center italic'>choices</span>
            <div className='choices-list'>
<<<<<<< HEAD:frontend/src/admin/lessons/LessonItem.tsx
              {props.lesson.choices.map((choice) => {
=======
              {props.word.choices.map((choice) => {
>>>>>>> 5b641f4 (changed filenames and terms to words in frontend side):frontend/src/admin/words/WordItem.tsx
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
          <div className='word-item-buttons'>
            <button
              onClick={handleEditWord}
              className='button bg-purple-200 md:mr-4'
            >
              Edit word
            </button>
            <button className='red-button text-center' onClick={handleDeleteWord}>
              Delete word
            </button>
          </div>
        )}
      </>
    </Card>
  );
}
