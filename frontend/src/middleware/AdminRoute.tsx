import {
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

export default function AdminRoute (props: {children: JSX.Element}) {
  const state = useSelector((state: RootState) => state.user);

  if (state.user_token) {
    return <Navigate to='/' />;
  }
  return state.admin_token ? props.children : <Navigate to='/admin/login' />;
};