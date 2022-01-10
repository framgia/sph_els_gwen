import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { Nav, Container, Loader, Modal, Card } from '@components/';
import { getSpecificCategory } from '@api/CategoryApi';
import { setIsError, setIsLoading } from '@store/category';
import { deleteCategory } from '@api/CategoryApi';
import WarningIcon from '@icons/WarningIcon';

export default function CategoryDetails() {
  const { category_id } = useParams();
  const state = useSelector((state: RootState) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryItem, setCategoryItem] = useState({
    id: 0,
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
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
      {state.isLoading && !state.isError && <Loader />}

      <Container className='md:w-2/3 xs:w-full flex flex-col mx-auto justify-evenly'>
        <>
          <Modal
            isOpen={isModalOpen}
            toggleModal={(value) => setIsModalOpen(value)}
            buttonAction={{
              buttonText: 'Yes, delete this category',
              action: _deleteCategory,
            }}
          >
            <WarningIcon className='w-32 text-red-300' />
            <h1 className='text-3xl font-semibold'>
              Are you sure you want to delete this category?
            </h1>
          </Modal>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && !state.isLoading && <h1>error</h1>}
          {!state.isError && !state.isLoading && (
            <>
              <div className='w-full flex flex-col justify-between my-10'>
                <Link
                  to='/admin/dashboard'
                  className='button bg-purple-200 text-center w-28 self-start'
                >
                  Go back
                </Link>
                <div className='flex mt-10'>
                  <div className='flex flex-col justify-between w-3/4'>
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
                  <div className='flex flex-col w-1/4 justify-evenly items-end text-center'>
                    <Link
                      to={`/admin/categories/${categoryItem.id}/edit`}
                      className='button bg-purple-200 w-40'
                    >
                      Edit category
                    </Link>
                    <button
                      className='red-button w-40'
                      onClick={() => setIsModalOpen(true)}
                    >
                      Delete category
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start w-full'>
                <h1 className='text-2xl font-semibold'>
                  Lessons in this category
                </h1>
                {/* static placeholder for lessons list, will change in lessons management */}
                <p className='italic'>Place lessons here</p>
              </div>
            </>
          )}
        </>
      </Container>
    </>
  );
}
