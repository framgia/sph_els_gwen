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
    <div className='w-full mt-4'>
      <label className='input-label'>
        {props.label}:
        {props.required && <span className='text-lg text-red-500 ml-1'>*</span>}
      </label>
      {props.type === 'textarea' ? (
        <textarea
          className='mt-2 w-full px-3 py-2 rounded-xl border border-black resize-none focus:outline-none'
          rows={4}
          placeholder={props.placeholder}
        ></textarea>
      ) : (
        <input
          type={props.type}
          {...props.register}
          className='form-input'
          placeholder={props.placeholder}
        />
      )}
      <span className='error'>{props.errors?.message}</span>
    </div>
  );
};

export default FormInput;
