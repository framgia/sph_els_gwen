import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Loader, CategoryItem } from '@components/';
import { RootState } from '@store/store';
import { getAll, setIsLoading, setIsError, Category } from '@store/category';
import { getAllCategories } from '@api/CategoryApi';

export default function UserCategoriesList() {
  const state = useSelector((state: RootState) => state.category);
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
        {state.isLoading && !state.isError && <Loader />}
        {!state.isLoading && !state.isError && (
          <>
            <div className='flex flex-row w-full items-center justify-between mb-5'>
              <h1 className='page-label'>
                Categories list
              </h1>
            </div>
            <div className='category-list-group'>
              {state.categories.map((category: Category) => {
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
