import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Container, Loader, Modal, Notification } from '@components/';
import { WarningIcon, BackIcon } from '@icons/';
import WordsList from '@admin/words/WordsList';

import { deleteCategory, getSpecificCategory } from '@api/CategoryApi';

import { RootState } from '@store/store';
import { Category, setIsError, setIsLoading } from '@store/category';

export default function CategoryDetails() {
  const { category_id } = useParams();
  const state = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryItem, setCategoryItem] = useState<Category>({
    id: 0,
    name: '',
    description: '',
  });

  useEffect(() => {
    if (!category_id) {
      navigate('/admin/categories');
    } else {
      dispatch(setIsLoading(true));
      _getSpecificCategory(parseInt(category_id));
    }
  }, []);

  const _getSpecificCategory = (id: number) => {
    getSpecificCategory(id)
      .then((response) => {
        setCategoryItem(response.data.data);
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setIsError(true));
      });
  };

  const _deleteCategory = () => {
    deleteCategory(categoryItem.id)
      .then(() => navigate('/admin/dashboard'))
      .catch(() => dispatch(setIsError(true)));
  };

  return (
    <>
      <Nav className='bg-purple-200' />
      {state.category.isLoading && !state.category.isError && <Loader />}
      <Container className='flex flex-col lg:w-4/5 xs:w-full xs:px-8 md:mx-auto justify-evenly'>
        <>
          <Modal
            isOpen={isModalOpen}
            toggleModal={(value: boolean) => setIsModalOpen(value)}
            buttonAction={{
              buttonText: 'Yes, delete this category',
              action: _deleteCategory,
            }}
          >
            <WarningIcon className='w-32 text-red-300' />
            <p className='text-3xl font-semibold'>
              Are you sure you want to delete this category?
            </p>
          </Modal>
          {state.category.isLoading && !state.category.isError && <Loader />}
          {state.category.isError && !state.category.isLoading && (
            <div className='flex flex-col justify-center h-full'>
              <Notification
                isSuccess={false}
                title='An error has occurred. Please try again later.'
                errorAction='refresh'
              />
            </div>
          )}
          {!state.category.isError && !state.category.isLoading && (
            <>
              <div className='w-full flex flex-col justify-between my-10'>
                <Link
                  to='/admin/dashboard'
                  className='button flex bg-purple-200 items-center justify-around md:w-40 xs:w-32 self-start'
                >
                  <BackIcon className='w-7' />
                  Go back
                </Link>
                <div className='flex md:flex-row xs:flex-col mt-10'>
                  <div className='flex flex-col md:w-3/4 xs:w-full justify-between'>
                    <h1 className='text-4xl font-bold'>{categoryItem.name}</h1>
                    <p className='text-xl mt-7'>
                      {categoryItem.description === 'null' ? (
                        <span className='italic text-gray-400'>
                          No description provided
                        </span>
                      ) : (
                        categoryItem.description
                      )}
                    </p>
                  </div>
                  <div className='flex md:flex-col md:w-1/4 md:justify-around items-center xs:justify-around xs:mt-5 md:items-end text-center'>
                    <Link
                      to={`/admin/categories/${categoryItem.id}/edit`}
                      className='button bg-purple-200 md:w-40 xs:w-36'
                    >
                      Edit category
                    </Link>
                    <button
                      className='red-button md:w-40 xs:w-36'
                      onClick={() => setIsModalOpen(true)}
                    >
                      Delete category
                    </button>
                  </div>
                </div>
              </div>
              <WordsList category_id={categoryItem.id} />
            </>
          )}
        </>
      </Container>
    </>
  );
}
