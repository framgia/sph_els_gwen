import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setAdminToken } from '@store/user';

export default function AuthAdminRoute(props: { children: JSX.Element }) {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  dispatch(setAdminToken(cookies.admin_token));

  if (cookies.token) {
    return <Navigate to='/' />;
  }
  return !cookies.admin_token ? (
    props.children
  ) : (
    <Navigate to='/admin/dashboard' />
  );
}
