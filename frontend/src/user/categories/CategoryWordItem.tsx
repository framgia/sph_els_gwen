import React, { useEffect, useState } from 'react';
import words, { Choice, Word } from '@store/words';

export default function CategoryWordItem(props: {
  word?: Word;
  onSelectAnswer: (choice: Choice) => void;
}) {
  const [selected, setIsSelected] = useState<Choice>();
  const [randomChoices, setRandomChoices] = useState<Choice[]>();

  const selectAnswer = (choice: Choice) => {
    setIsSelected(choice);
    props.onSelectAnswer(choice);
  };

  const shuffleChoices = () => {
    if (props.word?.choices) {
      let newChoices = [...props.word.choices];
      for (let index = 0; index < newChoices.length; index++) {
        let randomIndex = Math.floor(Math.random() * newChoices.length);
        let temp = newChoices[index];
        newChoices[index] = newChoices[randomIndex];
        newChoices[randomIndex] = temp;
      }
      setRandomChoices(newChoices);
    }
  };

  useEffect(() => {
    shuffleChoices();
  }, [props.word?.choices]);

  return (
    <div className='category-word-group'>
      <span className='category-word'>{props.word?.word}</span>
      <div className='word-choices-group'>
        <span className='md:text-2xl xs:text-xl italic'>choices:</span>
        <div className='choices-grid-group'>
          {randomChoices?.map((choice) => {
            return (
              <button
                className={`choice-item ${
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
