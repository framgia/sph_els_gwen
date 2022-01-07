import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { RootState } from '@store/store';
import { Nav, Container, Loader, Button, Card } from '@components/';
import { getSpecificCategory } from '@api/CategoryApi';
import { setIsError } from '@store/category';

export default function CategoryDetails() {
  const [cookies, setCookie] = useCookies();
  const { category_id } = useParams();
  const state = useSelector((state: RootState) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      _getSpecificCategory(category_id);
    }
  }, []);

  const _getSpecificCategory = (id: string) => {
    getSpecificCategory(cookies.admin_token, id)
      .then((response) => {
        setCategoryItem(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsError(true));
      });
  };

  return (
    <>
      <Nav className='bg-purple-200' />
      <Container className='w-3/5 mx-10 border flex flex-col mx-auto justify-evenly'>
        <>
          {state.isLoading && !state.isError && <Loader />}
          {state.isError && !state.isLoading && <h1>error</h1>}
          {!state.isError && !state.isLoading && (
            <>
              <div className='w-full border flex justify-between'>
                <div className='flex flex-col justify-between'>
                  <h1 className='text-4xl font-bold'>{categoryItem.name}</h1>
                  <p>{categoryItem.description}</p>
                </div>
                <div className='flex flex-col'>
                  <Button text='Edit category' />
                  <Button text='Delete category' className='red-button' />
                </div>
              </div>
              <div className='flex'>
                {[1,2,3].map((item) => {
                  return <div className='grid grid-cols-3'>
                    <Card className='flex flex-col p-10 rounded-xl'>
                      <div className='flex border justify-between w-full'>
                        <div className='flex flex-col w-3/6 border items-center'>
                          <h1>word</h1>
                          <h1 className='text-2xl text-purple-400 font-bold'>
                            Aut
                          </h1>
                        </div>
                        <div className='flex flex-col w-3/6 border items-center'>
                          <h1>answer</h1>
                          <h1 className='text-2xl text-purple-400 font-semibold'>
                            cou
                          </h1>
                        </div>
                      </div>
                      <div className='flex flex-col mt-10'>
                        <h1 className='text-center'>choices</h1>
                        <div className='flex justify-evenly mt-5'>
                          <h1 className='border border-secondary px-5 rounded-md'>
                            one
                          </h1>
                          <h1 className='border border-secondary px-5 rounded-md'>
                            one
                          </h1>
                          <h1 className='border border-secondary px-5 rounded-md'>
                            one
                          </h1>
                        </div>
                      </div>
                    </Card>
                  </div>;
                })}
              </div>
            </>
          )}
        </>
      </Container>
    </>
  );
}
