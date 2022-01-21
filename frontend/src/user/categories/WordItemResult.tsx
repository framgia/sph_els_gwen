import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { Word } from '@store/words';
import { CheckIcon, CrossIcon } from '@icons/';
import { ChoiceResults } from '@store/category';

export default function WordItemResult(props: {
  word: string;
  choices: ChoiceResults[];
  is_correct: boolean;
}) {
  const state = useSelector((state: RootState) => state);

  return (
    <div className='word-result-group'>
      <div className='word-column'>
        <span className='italic'>word</span>
        <span className='md:text-4xl xs:text-2xl text-purple-400 font-bold'>
          {props.word}
        </span>
      </div>
      <div className='choices-row'>
        <div className='flex w-3/4 justify-evenly'>
          {props.choices.map((choice, index) => {
            return (
              <>
                <div
                  className='flex flex-col w-1/5 items-center'
                  key={choice.name + index}
                >
                  <span
                    className={`choice-item-result
                      ${choice.is_correct && 'bg-success'}
                      ${choice.user_answer && !choice.is_correct && 'bg-failed'}
                    `}
                  >
                    {choice.name}
                  </span>
                  {choice.user_answer ? (
                    <span className='italic'>your answer</span>
                  ) : (
                    choice.is_correct && (
                      <span className='italic'>correct answer</span>
                    )
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className='flex w-1/4 items-center'>
          {props.is_correct ? (
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
