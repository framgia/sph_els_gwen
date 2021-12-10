import Logo from '../icons/Logo';
import Card from './Card';
import Container from './Container';
import FormInput from './FormInput';
import Button from './Button';
import './index.css';
import { Link } from 'react-router-dom';

const AccountCardGroup = ({isLogin}: {isLogin?:boolean}) => {
  return (
    <Container>
      <Card rounded={false} className={`card
       ${isLogin ? 'md:h-3/5 xs:h-full' : 'md:h-5/6 xs:h-full'}
      `}
      >
        <div className='logo-name-group'>
          <Logo className='logo' />
          <div className='flex flex-col project-name-group'>
            <h1 className='project-name'>ELS</h1>
            <h6 className='project-sub-heading'>e-learning system</h6>
          </div>
        </div>
        <>
          <AccountForm isLogin={isLogin} />
        </>
      </Card>
    </Container>
  );
};


export const AccountForm = ({isLogin}: {isLogin?:boolean}) => {
  return (
      <form className='form-group'>
        <h1 className='form-title'>{isLogin ? 'Login' : 'Create account'}</h1>
        <div>
          {!isLogin && <FormInput label='name' placeholder='John Doe' />}
          <FormInput label='email' placeholder='example@email.com' />
          <FormInput
            label='password'
            placeholder='&bull;&bull;&bull;&bull;&bull;'
            type='password'
          />
          {!isLogin && (
            <FormInput
              label='password confirmation'
              placeholder='&bull;&bull;&bull;&bull;&bull;'
              type='password'
            />
          )}
        </div>
        <div className='flex flex-col items-center lg:my-8 my:mt-8 sm:mt-10 xs:mt-10'>
          <Button
            text={isLogin ? 'Login' : 'Create account'}
            className='md:w-56 xs:w-48'
          />
          {isLogin && (
            <h3 className='mt-4'>
              Don't have an account?{' '}
              <Link
                to='/register'
                className='text-purple-700 hover:underline hover:underline-offset-8'
              >
                Register here
              </Link>
            </h3>
          )}
        </div>
      </form>
  );
};

export default AccountCardGroup;