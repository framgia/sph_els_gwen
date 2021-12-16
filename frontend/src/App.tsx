import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Register from './account/Register';
import Home from './home';
import Login from './account/Login';
import AdminDashboard from './admin';

export const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login isAdmin={false} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/login' element={<Login isAdmin={true} />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    );
}

export default App;
