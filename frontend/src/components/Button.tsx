const Button = (props: {
  className?: string;
  text?: string;
  dark?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`button ${props.className} ${
        props.dark ? 'bg-primary' : 'bg-purple-200'
      }`}
      onClick={() => props?.onClick}
    >
      {props.text ?? 'Submit'}
    </button>
  );
};

export default Button;
