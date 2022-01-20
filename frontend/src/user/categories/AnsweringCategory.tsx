import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Nav, Container, Loader, Card, Notification } from '@components/';
import { RootState } from '@store/store';
import { Category, setIsError, setIsLoading } from '@store/category';
import { Choice, getWords, setAnswers, Word } from '@store/words';
import { getAllWords } from '@api/WordApi';
import CategoryWordItem from './CategoryWordItem';
import './index.css'

export default function AnsweringCategory() {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [currentWord, setCurrentWord] = useState<Word>();
  const [currentAnswer, setCurrentAnswer] = useState<Choice>();
  const [errorMsg, setErrorMsg] = useState('');
  const [index, setIndex] = useState(0);

  const _getWords = (id: number) => {
    getAllWords(id)
      .then((response) => {
        dispatch(getWords(response.data.data));
        setCurrentWord(response.data.data[index]);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setIsError(true));
      });
  };

  const handleNextWord = () => {
    dispatch(setAnswers(currentAnswer));
    setCurrentAnswer({
      id: 0,
      name: '',
      word_id: 0,
      is_correct: false,
    });
    if (index + 1 < state.words.words.length) {
      setIndex(index + 1);
      setCurrentWord(state.words.words[index + 1]);
    } else {
      navigate(`/categories/${category_id}/results`);
    }
  };

  useEffect(() => {
    if (!category_id) {
      navigate('/');
    } else {
      dispatch(setIsLoading(true));
      _getWords(parseInt(category_id));
    }
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='answering-category-page'>
        <>
          {state.category.isLoading && !state.category.isError && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <Notification
              isSuccess={false}
              title='An error has occurred. Please try again later.'
              errorAction='refresh'
            />
          )}
          {!state.category.isLoading && !state.category.isError && (
            <div className='content-group'>
              <Link to='/' className='button bg-primary w-56 mb-10 text-center'>
                Back to categories list
              </Link>
              <Card className='category-word-card'>
                <span className='self-end mb-5'>
                  Word {index + 1} out of {state.words.words.length}
                </span>
                <h1 className='category-word-header'>
                  Choose which has the closest meaning to the word below:
                </h1>
                <CategoryWordItem
                  word={currentWord}
                  onSelectAnswer={(choice) => {
                    setCurrentAnswer(choice);
                  }}
                />
              </Card>
              <button
                className={`category-word-button ${
                  currentAnswer?.id !== 0 && currentAnswer
                    ? 'bg-primary hover:bg-secondary hover:text-white'
                    : 'bg-purple-100'
                }`}
                disabled={
                  currentAnswer?.id === 0 || !currentAnswer ? true : false
                }
                onClick={() => handleNextWord()}
              >
                <span className='text-center'>
                  {
                    index + 1 < state.words.words.length
                    ? 'Next word'
                    : 'Finish category'
                  }
                </span>
              </button>
            </div>
          )}
        </>
      </Container>
    </>
  );
}
