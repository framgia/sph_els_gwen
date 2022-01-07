const Container = (props: { children:JSX.Element[] | JSX.Element | boolean, className?: string } ) => {
  return <div className={`flex items-center ${props.className}`}>{props.children}</div>;
};

export default Container;
