import React from 'react';
import Button from './Button';
import './index.css';

interface FormGroupProps {
  title: string;
  buttonText: string;
  formMethod: string;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void);
  children?: JSX.Element[] | JSX.Element;
}


const FormGroup = (props:FormGroupProps) => {
  return (
    <form
      className='form-group'
      method={props.formMethod}
      onSubmit={(event) => {
        props.onSubmit(event);
      }}
    >
      <h1 className='form-title'>{props.title}</h1>
      <div className='w-full'>{props.children}</div>
      <Button text={props.buttonText} className='md:w-56 xs:w-48 mt-8' />
    </form>
  );
};

export default FormGroup;