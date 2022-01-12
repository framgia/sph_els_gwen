import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUserToken } from '@store/user';

export default function AuthUserRoute(props: { children: JSX.Element }) {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  dispatch(setUserToken(cookies.token));

  if (cookies.admin_token) {
    return <Navigate to='/admin/dashboard' />;
  }
  return !cookies.token ? props.children : <Navigate to='/' />;
}
