const Button = (props: { className?:string, text?:string }) => {
  return (
    <button className={`
      bg-primary w-56  rounded-full
      py-2 px-4
      hover:bg-secondary hover:text-white ${props.className}`}
      >
      {props.text ?? 'Submit'}
    </button>
  );
};

export default Button;
