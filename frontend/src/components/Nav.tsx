import Logo from '../icons/Logo';

const Nav = () => {
    return (
      <nav className='flex items-center flex-wrap bg-primary p-4 pl-10'>
        <Logo className='w-10' />
        <h1 className='ml-4 text-2xl font-semibold tracking-wider'>E-Learning System</h1>
      </nav>
    );
}
 
export default Nav;