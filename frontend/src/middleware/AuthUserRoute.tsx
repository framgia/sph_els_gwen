import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

export default function AuthUserRoute(props: {children: JSX.Element}) {
const state = useSelector((state: RootState) => state.user);

  if (state.admin_token) {
    return <Navigate to='/admin/dashboard' />;
  }
  return !state.user_token ? props.children : <Navigate to='/' />;
};
