import { Nav } from '@components/';
import UserCategoriesList from '@user/categories/UserCategoriesList';

const UserDashboard = () => {
  return (
    <div>
      <Nav className='bg-primary' />
      <UserCategoriesList />
    </div>
  );
};

export default UserDashboard;
