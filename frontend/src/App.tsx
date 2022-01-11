import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CategoryDetails from '@admin/categories/CategoryDetails';
import AddCategory from '@admin/categories/AddCategory';
import EditCategory from '@admin/categories/EditCategory';
import EditLesson from '@admin/lessons/EditLesson';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* USER ROUTES */}
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
        {/* ADMIN ROUTES */}
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
          path='/admin/categories/:category_id'
          element={
            <AdminRoute>
              <CategoryDetails />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/categories/add'
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/categories/:category_id/edit'
          element={
            <AdminRoute>
              <EditCategory />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/categories/:category_id/lessons/:lesson_id/edit'
          element={
            <AdminRoute>
              <EditLesson />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
