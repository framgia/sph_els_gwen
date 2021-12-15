const Container = (props: { children:JSX.Element[] | JSX.Element | boolean } ) => {
  return <div className='h-screen flex items-center'>{props.children}</div>;
};

export default Container;
