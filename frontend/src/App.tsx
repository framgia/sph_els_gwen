import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AdminDashboard from '@admin/index';
import AdminLogin from '@admin/AdminLogin';
import Register from '@user/Register';
import UserLogin from '@user/UserLogin';
import UserDashboard from '@user/index';

export default function App() {
    return (
      <Router>
        <Routes>
          <Route
            path='/admin/dashboard'
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path='/admin/login'
            element={
              <AuthAdminRoute>
                <AdminLogin />
              </AuthAdminRoute>
            }
          />
          <Route path='/login' element={<AuthUserRoute><UserLogin/></AuthUserRoute>} />
          <Route
            path='/'
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    );
}



export const AdminRoute = (props: {children: JSX.Element}) => {  
  const [cookies, setCookie] = useCookies();
  if(cookies.token) {
    return <Navigate to='/' />;
  }
  return cookies.admin_token ? props.children : <Navigate to='/admin/login'/>
};

export const AuthAdminRoute = (props: { children: JSX.Element }) => {
  const [cookies, setCookie] = useCookies();
   if (cookies.token) {
     return <Navigate to='/' />;
   }
  return !cookies.admin_token ? props.children : <Navigate to='/admin/dashboard' />;
};


export const UserRoute = (props: { children: JSX.Element }) => {
  const [cookies, setCookie] = useCookies();
   if (cookies.admin_token) {
     return <Navigate to='/admin/dashboard' />;
   }
  return cookies.token ? props.children : <Navigate to='/login' />;
};

export const AuthUserRoute = (props: { children: JSX.Element }) => {
  const [cookies, setCookie] = useCookies();
  if (cookies.admin_token) {
    return <Navigate to='/admin/dashboard' />;
  }
  return !cookies.token ? (
    props.children
  ) : (
    <Navigate to='/' />
  );
};