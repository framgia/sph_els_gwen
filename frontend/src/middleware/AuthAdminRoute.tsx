import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function AuthAdminRoute(props: { children: JSX.Element }) {
  const [cookies, setCookie] = useCookies();
  if (cookies.token) {
    return <Navigate to='/' />;
  }
  return !cookies.admin_token ? (props.children) : (<Navigate to='/admin/dashboard' />);
}
