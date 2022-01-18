import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Notification, Loader } from '@components/';
import { getAllCategories } from '@api/CategoryApi';
import { getAll, setIsLoading, setIsError } from '@store/category';
import { RootState } from '@store/store';
import CategoryItem from './CategoryItem';
import { Category } from '@store/category';

export default function CategoriesList() {
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
    <>
      <Container className='m-10 flex-col z-10'>
        <>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && !state.isLoading && (
              <Notification
                isSuccess={false}
                title='An error has occurred. Please try again later.'
                errorAction='refresh'
              />
          )}
          {!state.isLoading && !state.isError && (
            <>
              <div className='flex flex-row w-full items-center justify-between mb-5'>
                <h1 className='md:my-6 self-center md:text-3xl xs:text-xl font-bold'>
                  Categories list
                </h1>
                <Link
                  to='/admin/categories/add'
                  className='button md:w-56 xs:w-24 bg-purple-200 text-center xs:text-xs'
                >
                  Add new
                </Link>
              </div>
              <div className='category-list-group'>
                {state.categories.map((category: Category) => {
                  return (
                    <CategoryItem
                      id={category.id}
                      name={category.name}
                      description={category.description}
                      key={`category${category.id}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      </Container>
    </>
  );
}
