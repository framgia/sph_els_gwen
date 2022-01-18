import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeToken } from '@store/user';
import { Logo } from '@icons/';
import { useCookies } from 'react-cookie';

const Nav = (props: { className?: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, , removeCookie] = useCookies();

  const handleLogout = () => {
    dispatch(removeToken);
    cookies.admin_token
      ? removeCookie('admin_token', { path: '/' })
      : removeCookie('token', { path: '/' });
    navigate('/');
  };

  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-4 pl-10 w-full ${props.className} sticky top-0 z-50`}
    >
      <div className='flex items-center'>
        <Logo className='md:w-10 xs:w-8' />
        <span className='ml-4 md:text-2xl sm:text-lg xs:text-md font-semibold tracking-wider'>
          E-Learning System
        </span>
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
