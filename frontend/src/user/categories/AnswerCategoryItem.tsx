import React, { useState } from 'react';
import words, { Choice, Word } from '@store/words';

export default function AnswerCategoryItem(props: { word?: Word, onSelectAnswer: (choice:Choice) => void }) {
  const [selected, setIsSelected] = useState<Choice>();

  const selectAnswer = (choice: Choice) => {
    setIsSelected(choice);
    props.onSelectAnswer(choice);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
      <span className='md:text-5xl xs:text-4xl text-purple-400 font-bold'>
        {props.word?.word}
      </span>
      <div className='flex flex-col w-full items-center justify-center mt-10'>
        <span className='md:text-2xl xs:text-xl italic'>choices:</span>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 w-full mt-5'>
          {props.word?.choices.map((choice) => {
            return (
              <button
                className={`md:text-2xl xs:text-xl text-center border-2 border-primary rounded-lg p-1 py-2 ${
                  selected?.id === choice.id ? 'bg-primary' : 'hover:bg-primary'
                }`}
                key={choice.id}
                onClick={() => selectAnswer(choice)}
              >
                {choice.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
