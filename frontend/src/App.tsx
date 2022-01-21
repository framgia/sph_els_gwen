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
import EditWord from '@admin/words/EditWord';
import AnsweringCategory from '@user/categories/AnsweringCategory';
import CategoryResults from '@user/categories/CategoryResults';
import UserCategoriesList from '@user/categories/UserCategoriesList';
import UsersList from '@user/profiles/UsersList';


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
        <Route
          path='/categories/:category_id'
          element={
            <UserRoute>
              <AnsweringCategory />
            </UserRoute>
          }
        />
        <Route
          path='/categories/:category_id/results'
          element={
            <UserRoute>
              <CategoryResults />
            </UserRoute>
          }
        />
        <Route
          path='/categories'
          element={
            <UserRoute>
              <UserCategoriesList />
            </UserRoute>
          }
        />
        <Route
          path='/users/all'
          element={
            <UserRoute>
              <UsersList />
            </UserRoute>
          }
        />
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
          path='/admin/categories/:category_id/words/:word_id/edit'
          element={
            <AdminRoute>
              <EditWord />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
