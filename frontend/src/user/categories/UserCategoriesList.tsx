import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Loader, CategoryItem, Notification } from '@components/';
import { RootState } from '@store/store';
import {
  getAll,
  setIsLoading,
  setIsError,
  Category,
} from '@store/category';
import { getAllCategories } from '@api/CategoryApi';

export default function UserCategoriesList() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    _getAllCategories();
  }, []);

  const _getAllCategories = () => {
    dispatch(setIsLoading(true));
    getAllCategories()
      .then((response) => {
        dispatch(getAll(response.data.data));
        dispatch(setIsLoading(false));
      })
      .catch(() => {
        dispatch(setIsError(true));
      });
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
              {state.category.categories.map((category: Category) => {
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
            </div>
          </>
        )}
      </>
    </Container>
  );
}
 