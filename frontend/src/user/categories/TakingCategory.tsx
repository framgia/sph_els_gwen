import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Nav, Container, Loader, Card } from '@components/';
import { RootState } from '@store/store';
import { Category, setIsError, setIsLoading } from '@store/category';
import { Choice, getWords, setAnswers, Word } from '@store/words';
import { getAllWords } from '@api/WordApi';
import AnswerCategoryItem from './AnswerCategoryItem';

export default function TakingCategory() {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [currentWord, setCurrentWord] = useState<Word>();
  const [currentAnswer, setCurrentAnswer] = useState<Choice[]>([]);
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

  const handleSelectedAnswer = (choice: Choice) => {
    // setCurrentAnswer([...currentAnswer, choice]);
    dispatch(setAnswers(choice));
    setErrorMsg('');
  };

  const handleNextWord = () => {
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
      <Container className='flex flex-col lg:w-4/5 xs:w-full xs:px-8 md:mx-auto justify-evenly'>
        <>
          {state.category.isLoading && !state.category.isError && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <span>error</span>
          )}
          {!state.category.isLoading && !state.category.isError && (
            <div className='md:my-20 xs:my-10 flex flex-col md:w-9/12 xs:w-11/12'>
              <Card className='md:p-20 xs:p-10 w-full flex flex-col items-center justify-center rounded-xl border-secondary'>
                <span className='self-end mb-5'>
                  Word {index + 1} out of {state.words.words.length}
                </span>
                <h1 className='md:text-2xl xs:text-lg md:font-semibold text-center'>
                  Choose which has the closest meaning to the word below:
                </h1>
                <AnswerCategoryItem
                  word={currentWord}
                  onSelectAnswer={(choice) => {
                    handleSelectedAnswer(choice);
                  }}
                />

                <span className='mt-5 self-end text-xl font-semibold text-red-500'>
                  {errorMsg}
                </span>
              </Card>
              <button
                className={`rounded-full text-center w-48 self-end mt-10 px-10 py-3 ${
                  state.words.answers.length === index + 1
                    ? 'bg-primary hover:bg-secondary hover:text-white'
                    : 'bg-purple-100'
                }`}
                disabled={
                  state.words.answers.length === index + 1 ? false : true
                }
                onClick={() => handleNextWord()}
              >
                <span className='text-xl text-center'>Next word</span>
              </button>
            </div>
          )}
        </>
      </Container>
    </>
  );
}
