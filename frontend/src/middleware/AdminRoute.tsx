import {
  Navigate,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { RouteProps } from '.';

export default function AdminRoute (props: {children: JSX.Element}) {
  const [cookies, setCookie] = useCookies();
  if (cookies.token) {
    return <Navigate to='/' />;
  }
  return cookies.admin_token ? props.children : <Navigate to='/admin/login' />;
};