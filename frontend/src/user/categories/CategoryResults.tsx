import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Nav, Container, Loader, Card } from '@components/';
import { CheckIcon } from '@icons/';
import { RootState } from '@store/store';
import WordItemResult from './WordItemResult';
import './index.css';

export default function CategoryResults() {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const score = state.words.answers.filter((answer) => {
    return answer.is_correct
  });

  useEffect(() => {
    if (!category_id && state.words.answers.length === 0) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='category-results-group'>
        <>
          <Link
            to='/'
            className='button bg-primary w-56 mb-3 text-center self-end'
          >
            Back to categories list
          </Link>
          <h1 className='category-results-header'>
            Your results for this category:
          </h1>
          <div className='flex flex-col w-full my-8'>
            <span className='text-2xl self-end'>
              Score:{' '}
              <span className='text-3xl text-purple-500 font-bold'>
                {score.length}
              </span>{' '}
              out of {state.words.words.length}
            </span>
            {state.words.words.map((word) => <WordItemResult word={word} />)}
          </div>
        </>
      </Container>
    </>
  );
}
