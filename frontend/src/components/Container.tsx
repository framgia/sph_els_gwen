const Container = (props: { children:JSX.Element[] | JSX.Element } ) => {
  return <div className='h-screen flex items-center'>{props.children}</div>;
};

export default Container;
