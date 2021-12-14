const Button = (props: { className?:string, text?:string }) => {
  return (
    <button className={`button ${props.className}`}
      >
      {props.text ?? 'Submit'}
    </button>
  );
};

export default Button;
