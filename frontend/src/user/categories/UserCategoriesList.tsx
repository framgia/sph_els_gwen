import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Loader, CategoryItem, Notification } from '@components/';
import { RootState } from '@store/store';
import {
  getAll,
  setIsLoading,
  setIsError,
  Category,
  UserCategoryLog,
} from '@store/category';
import { getAllCategories, getUserCategoryLogs } from '@api/CategoryApi';
import { useCookies } from 'react-cookie';

export default function UserCategoriesList() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [cookies, _] = useCookies();
  const [takenCategories, setTakenCategories] = useState<number[]>([]);

  const availableCategories = state.category.categories.filter(
    (category) => !takenCategories.includes(category.id)
  );
  const disabledCategories = state.category.categories.filter((category) =>
    takenCategories.includes(category.id)
  );

  useEffect(() => {
    _getAllCategories();
    _getUserCategoryLogs();    
  }, []);

  const _getAllCategories = () => {
    dispatch(setIsLoading(true));
    getAllCategories()
      .then((response) => {
        dispatch(getAll(response.data.data));
      })
      .catch(() => {
        dispatch(setIsError(true));
      });
  };

  const _getUserCategoryLogs = () => {
    getUserCategoryLogs(cookies.user['id'])
      .then((response) => {
        if (response.status === 200) {
          const user_category_logs = response.data.data;
          const category_logs_id = [0];
          user_category_logs.map((log: UserCategoryLog) => {
            category_logs_id.push(log.category_id);
          });
          setTakenCategories(category_logs_id);
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => dispatch(setIsError(true)));
  };

  return (
    <Container className='m-10 flex-col z-10'>
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
            <div className='flex flex-row w-full items-center justify-between mb-5'>
              <h1 className='page-label'>Categories list</h1>
            </div>
            <div className='category-list-group'>
              {availableCategories.map((category: Category) => {
                return (
                  <CategoryItem
                    id={category.id}
                    name={category.name}
                    description={category.description}
                    key={`category${category.id}`}
                    link={`/categories/${category.id}`}
                    buttonColor='bg-primary'
                    buttonText='Start this category'
                  />
                );
              })}
              {disabledCategories.map((category) => {
                return (
                  <CategoryItem
                    id={category.id}
                    name={category.name}
                    description={category.description}
                    key={`category${category.id}`}
                    link={`/categories/${category.id}/results`}
                    buttonColor='bg-primary'
                    buttonText='See results of this category'
                    disabled={true}
                  />
                );
              })}
            </div>
          </>
        )}
      </>
    </Container>
  );
}
