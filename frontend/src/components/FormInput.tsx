import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errorMsg?: string;
}

const FormInput = (props: FormInputProps) => {
  const capitalized_label =
    props.label.charAt(0).toUpperCase() + props.label.slice(1);

  return (
    <div className='mt-6'>
      <label
        className='text-gray-700 lg:text-lg md:text-lg xs:text-sm xs:text-sm'
        htmlFor='grid-first-name'
      >
        {capitalized_label} *
      </label>
      <input
        className={`mt-2 appearance-none block w-full text-gray-700 border border-black rounded-lg leading-tight focus:outline-none focus:bg-white
        py-2 px-4 ${props.errorMsg ? 'mb-0' : 'mb-3'}`}
        value={props.value}
        type={props.type ?? 'text'}
        name={props.label.toLowerCase().replace(' ', '_')}
        required={props.required ?? true}
        placeholder={props.placeholder ?? props.label}
        onChange={(event) => {
          props.onChange(event);
        }}
      />
      <span className='text-sm text-red-500'>{props.errorMsg}</span>
    </div>
  );
};

export default FormInput;
