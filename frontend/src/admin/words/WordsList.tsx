import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddIcon, WarningIcon } from '@icons/';
import { Card, Modal } from '@components/';
import WordItem from './WordItem';
import AddWords from './AddWords';

import { RootState } from '@store/store';
import { setIsError } from '@store/category';
import { getWords, Word, setIsAddingWord, setIsLoading } from '@store/words';
import { deleteWord, getAllWords } from '@api/WordApi';
import './index.css';

export default function WordsList(props: {
  category_id?: number;
  isEditable?: boolean;
}) {
  const state = useSelector((state: RootState) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(0);
  const dispatch = useDispatch();

  const _getWords = () => {
    dispatch(setIsLoading(true));
    if (props.category_id) {
      getAllWords(props.category_id)
        .then((response) => {
          dispatch(getWords(response.data.data));
          dispatch(setIsLoading(false));
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = () => {
    if (selectedWord !== 0 && props.category_id) {
      deleteWord(props.category_id, selectedWord)
        .then((response) => {
          if (response.status === 200) {
            setIsModalOpen(false);
          }
        })
        .catch((error) => dispatch(setIsError(true)));
      setSelectedWord(0);
    }
  };

  useEffect(() => { 
    _getWords();
  }, []);

  return (
    <>
      <div className='words-list-group w-full'>
        <Modal
          isOpen={isModalOpen}
          toggleModal={(isOpen: boolean) => setIsModalOpen(isOpen)}
          buttonAction={{
            buttonText: 'Yes, delete this word',
            action: () => {
              handleDelete();
            },
          }}
        >
          <WarningIcon className='w-32 text-red-300' />
          <span className='text-3xl font-semibold'>
            Are you sure you want to delete this word?
          </span>
        </Modal>
        <>
          {!state.words.isAddingWord && (
            <>
              <h2 className='page-label'>Words in this category</h2>
              <div
                className={`words-card-group ${
                  props.isEditable
                    ? 'lg:grid-cols-3 md:grid-cols-2'
                    : 'lg:grid-cols-4 md:grid-cols-2'
                }`}
              >
                {state.words.words.length < 1 && (
                  <span className='italic text-lg text-gray-400'>
                    No words yet. Edit this category to add words.
                  </span>
                )}
                {state.words.words.map((word: Word) => {
                  return (
                    <WordItem
                      key={word.id}
                      word={word}
                      isEditable={props.isEditable}
                      toggleModal={(isOpen: boolean, id: number) => {
                        setIsModalOpen(isOpen);
                        setSelectedWord(id);
                      }}
                    />
                  );
                })}
                {props.isEditable && state.words.words.length < 10 && (
                  <button onClick={() => dispatch(setIsAddingWord(true))}>
                    <Card className='add-word-card'>
                      <AddIcon className='w-16 text-secondary' />
                    </Card>
                  </button>
                )}
              </div>
            </>
          )}
          {state.words.isAddingWord && (
            <>
              <AddWords category_id={props.category_id ?? 0} />
            </>
          )}
        </>
      </div>
    </>
  );
}
