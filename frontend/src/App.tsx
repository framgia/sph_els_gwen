import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AdminDashboard from '@admin/index';
import AdminLogin from '@admin/AdminLogin';
import Register from '@user/Register';
import UserLogin from '@user/UserLogin';
import UserDashboard from '@user/index';
import {
  AdminRoute,
  AuthAdminRoute,
  UserRoute,
  AuthUserRoute,
} from '@middleware/index';

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
        <Route
          path='/login'
          element={
            <AuthUserRoute>
              <UserLogin />
            </AuthUserRoute>
          }
        />
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