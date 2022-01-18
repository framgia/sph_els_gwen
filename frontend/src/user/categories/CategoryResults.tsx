import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Nav, Container, Loader, Card } from '@components/';
import { CheckIcon } from '@icons/';
import { RootState } from '@store/store';

export default function CategoryResults() {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!category_id && state.words.answers.length === 0) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex flex-col lg:w-4/5 xs:w-full xs:px-8 my-10 md:mx-auto justify-evenly border'>
        <>
          <h1 className='md:text-2xl xs:text-lg md:font-semibold text-center'>
            Your results for this category:
          </h1>
          <div className='flex flex-col w-full my-10'>
            {state.words.words.map((word) => {
              return (
                <div className='flex w-full justify-start items-center border my-5'>
                  <div className='flex justify-center w-1/4'>
                    <span
                      key={word.id}
                      className='md:text-3xl xs:text-2xl text-purple-400 font-bold'
                    >
                      {word.word}
                    </span>
                  </div>
                  <div className='flex w-3/4 justify-between items-center'>
                    <div className='flex w-3/4 justify-evenly'>
                      {word.choices.map((choice, index) => {
                        //chosen answer by user
                        const answer = state.words.answers.find(
                          (choiceAnswer) => {
                            return choiceAnswer.id === choice.id;
                          }
                        );

                        return (
                          <div className='flex flex-col items-center border w-1/6'>
                            <span
                              key={choice.id}
                              className={`text-center border w-full border-lightgray p-2 md:text-2xl xs:text-xl rounded-xl 
                                ${choice.is_correct ? 'bg-success' : ''}
                                ${answer?.id === choice.id && !choice.is_correct && 'bg-failed'}
                              `}
                            >
                              {choice.name}
                            </span>
                            {answer?.id === choice.id && (
                              <span>your answer</span>
                            )}
                            {choice.is_correct && answer?.id !== choice.id && (
                              <span>correct answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className='flex w-1/4 items-center'>
                      <CheckIcon className='w-10 mr-5' />
                      <span className='text-2xl text-green-500 font-semibold'>
                        correct
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      </Container>
    </>
  );
}
