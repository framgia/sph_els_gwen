import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { Word } from '@store/words';
import { CheckIcon, CrossIcon } from '@icons/';

export default function WordItemResult({ word }: { word: Word }) {
  const state = useSelector((state: RootState) => state);
  const answer = state.words.answers.find((choiceAnswer) => {
    return choiceAnswer.word_id === word.id;
  });
  const correctAnswer = word.choices.find((choice) => {
    return choice.is_correct;
  });

  return (
    <div className='word-result-group'>
      <div className='word-column'>
        <span className='italic'>word</span>
        <span
          key={word.id}
          className='md:text-4xl xs:text-2xl text-purple-400 font-bold'
        >
          {word.word}
        </span>
      </div>
      <div className='choices-row'>
        <div className='flex w-3/4 justify-evenly'>
          {word.choices.map((choice, index) => {
            return (
              <>
                <div className='flex flex-col w-1/5 items-center' key={choice.id}>
                  <span
                    className={`choice-item-result
                      ${choice.is_correct && 'bg-success'}
                      ${
                        answer?.id === choice.id &&
                        !choice.is_correct &&
                        'bg-failed'
                      }
                    `}
                  >
                    {choice.name}
                  </span>
                  {choice.is_correct && answer?.id !== choice.id ? (
                    <span className='italic'>correct answer</span>
                  ) : (
                    answer?.id === choice?.id && <span>your answer</span>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className='flex w-1/4 items-center'>
          {answer?.id === correctAnswer?.id ? (
            <>
              <CheckIcon className='w-10 mr-2' />
              <span className='text-2xl text-success font-semibold'>
                correct
              </span>
            </>
          ) : (
            <>
              <CrossIcon className='w-10 mr-2' />
              <span className='text-2xl text-failed font-semibold'>
                incorrect
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
