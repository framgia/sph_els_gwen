import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  register: {};
  errors?: FieldError;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const FormInput = (props: FormInputProps) => {
  return (
    <div className='w-full'>
      <label className='input-label'>
        {props.label}:
        {props.required && <span className='text-lg text-red-500 ml-1'>*</span>}
      </label>
      <input type={props.type}  {...props.register} className='form-input' placeholder={props.placeholder}/>
      <span className='error'>{props.errors?.message}</span>
    </div>
  );
};

export default FormInput;