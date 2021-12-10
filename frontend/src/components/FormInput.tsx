// const capitalize = (word:string) => {

// }

const FormInput = (props: { label:string, type?:string, placeholder?:string }) => {

  const capitalized_label = props.label.charAt(0).toUpperCase() + props.label.slice(1);

  return (
    <div className='mt-6'>
      <label
        className='text-gray-700 lg:text-lg md:text-lg xs:text-sm xs:text-sm'
        htmlFor='grid-first-name'
      >
        {capitalized_label}:
      </label>
      <input
        className='mt-2 appearance-none block w-full text-gray-700 border border-black rounded-lg mb-3 leading-tight focus:outline-none focus:bg-white
        py-2 px-4'
        id='grid-first-name'
        type={props.type ?? 'text'}
        name={props.label.toLowerCase().replace(' ', '-')}
        placeholder={props.placeholder ?? props.label}
      />
    </div>
  );
};

export default FormInput;
