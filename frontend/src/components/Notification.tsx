
import { Link, useNavigate } from 'react-router-dom';
import Check from '@icons/Check';
import Error from '@icons/Error';

interface ModalProps {
  isSuccess: boolean;
  title?: string;
  children?: any;
  errorAction?: string
}

export default function Notification(props: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col items-center justify-between h-full'>
      {props.isSuccess ? <Check /> : <Error />}
      <h1 className='md:text-4xl xs:text-xl'>{props.title}</h1>
      {props.isSuccess && props.children}
      {!props.isSuccess && props.errorAction === 'back' && (
        <button
          className='button bg-primary text-center'
          onClick={() => {
            navigate(0);
          }}
        >
          Go back
        </button>
      )}
      {!props.isSuccess && props.errorAction === 'refresh' && (
        <button
          className='button bg-primary text-center'
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh and try again
        </button>
      )}
    </div>
  );
}
