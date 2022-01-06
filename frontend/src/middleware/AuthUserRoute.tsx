import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function AuthUserRoute(props: {children: JSX.Element}) {
  const [cookies, setCookie] = useCookies();
  if (cookies.admin_token) {
    return <Navigate to='/admin/dashboard' />;
  }
  return !cookies.token ? props.children : <Navigate to='/' />;
};
