
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CheckIcon from '@icons/CheckIcon';
import ErrorIcon from '@icons/ErrorIcon';
import { setIsError } from '@store/category';

interface ModalProps {
  isSuccess: boolean;
  title?: string;
  children?: any;
  errorAction?: string
}

export default function Notification(props: ModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className='w-full flex flex-col items-center justify-between h-full'>
      {props.isSuccess ? <CheckIcon /> : <ErrorIcon />}
      <h1 className='md:text-4xl xs:text-xl mt-8'>{props.title}</h1>
      {props.isSuccess && props.children}
      {!props.isSuccess && props.errorAction === 'back' && (
        <button
          className='button bg-primary text-center mt-8'
          onClick={() => {
            navigate('/admin/dashboard');
            dispatch(setIsError(false));
          }}
        >
          Go back
        </button>
      )}
      {!props.isSuccess && props.errorAction === 'refresh' && (
        <button
          className='button bg-primary text-center mt-8'
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
