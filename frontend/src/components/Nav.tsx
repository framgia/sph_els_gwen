import Logo from '../icons/Logo';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie('user');
    removeCookie('token');
    navigate('/login');
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-primary p-4 pl-10 w-full'>
      <div className='flex items-center'>
        <Logo className='w-10' />
        <h1 className='ml-4 text-2xl font-semibold tracking-wider'>
          E-Learning System
        </h1>
      </div>
      <button
        className='border border-secondary p-2 px-4 justify-self-end hover:bg-secondary hover:text-white'
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Nav;
