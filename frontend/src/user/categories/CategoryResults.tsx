import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Nav, Container, Loader, Notification } from '@components/';
import { RootState } from '@store/store';
import WordItemResult from './WordItemResult';
import './index.css';
import { getCategoryLog } from '@api/CategoryApi';
import { useCookies } from 'react-cookie';
import { setCategoryLogs, setIsError } from '@store/category';
import { setIsLoading } from '@store/words';

export default function CategoryResults() {
  const { category_id } = useParams();
  const state = useSelector((state: RootState) => state);
  const [cookies, _] = useCookies();
  const dispatch = useDispatch();

  const score = state.category.categoryLogs.filter((answer) => {
    return answer.is_correct;
  });

  const categoryWords = state.category.categoryLogs.map(
    (results) => results.word
  );

  const _getCategoryLog = (category_id: number) => {
    getCategoryLog(cookies.user['id'], category_id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setCategoryLogs(response.data.data));
          dispatch(setIsLoading(false));
        }
      })
      .catch(() => dispatch(setIsError(true)));
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (category_id) {
      _getCategoryLog(parseInt(category_id));
    }
    
    console.log(state.category.userCategoryLogs);
  }, []);

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='category-results-group'>
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
            <>
              <Link
                to='/'
                className='button bg-primary w-56 mb-3 text-center self-end'
              >
                Back to categories list
              </Link>
              {state.category.categoryLogs.length < 1 ? (
                <>
                  <span className='md:text-4xl xs:text-2xl font-bold text-gray-500 italic mt-20'>
                    No results for this category yet.
                  </span>
                  <Link
                    to={`/categories/${category_id}`}
                    className='button bg-primary mt-10 w-60 text-center'
                  >
                    Take this category
                  </Link>
                </>
              ) : (
                <>
                  <h1 className='category-results-header'>
                    Your results for this category:
                  </h1>
                  <div className='flex flex-col w-full my-8'>
                    <span className='text-2xl self-end'>
                      Score:{' '}
                      <span className='text-3xl text-purple-500 font-bold'>
                        {score.length}
                      </span>{' '}
                      out of {categoryWords.length}
                    </span>
                    {state.category.categoryLogs.map((results) => {
                      return (
                        <WordItemResult
                          word={results.word}
                          choices={results.choices}
                          key={results.id}
                          is_correct={results.is_correct}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      </Container>
    </>
  );
}
