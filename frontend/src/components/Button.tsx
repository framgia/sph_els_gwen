const Button = (props: { className?:string, text?:string, dark?:boolean }) => {
  return (
    <button
      className={`button ${props.className} ${
        props.dark
          ? 'bg-primary'
          : 'bg-purple-200'
      }`}
    >
      {props.text ?? 'Submit'}
    </button>
  );
};

export default Button;
