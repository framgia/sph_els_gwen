import { Nav } from '@components/';
import UserCategoriesList from '@user/categories/UserCategoriesList';
import { Link } from 'react-router-dom';
import { Card, Container } from '@components/';
import { useCookies } from 'react-cookie';

const UserDashboard = () => {
  const [cookies, _] = useCookies();
  const cardContent = [
    {
      title: 'Discover other users',
      description:
        "Check out other user's profile, see their followers and activity logs",
      link: '/users/all',
      linkText: 'View other users',
    },
    {
      title: 'View categories',
      description: 'Learn words and view your results',
      link: '/categories',
      linkText: 'Go to categories',
    },
  ];

  return (
    <>
      <Nav className='bg-primary' />
      <Container className='flex flex-col justify-evenly m-10'>
        <span className='text-3xl self-end'>Welcome back, {cookies.user['name'] }!</span>
        <h1 className='text-4xl font-bold self-start'>User Dashboard</h1>
        <div className='grid grid-cols-4 gap-10 w-full my-10'>
          {cardContent.map((card) => {
            return (
              <Card className='flex flex-col justify-evenly p-8 border-gray-400 rounded-xl'>
                <span className='text-2xl font-semibold'>{card?.title}</span>
                <span className='italic text-gray-500 mt-4'>
                  {card?.description}
                </span>
                <Link
                  to={card?.link ?? ''}
                  className='mt-10 button bg-primary w-2/3 text-center self-end'
                >
                  {card?.linkText}
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* <UserCategoriesList /> */}
    </>
  );
};

export default UserDashboard;
