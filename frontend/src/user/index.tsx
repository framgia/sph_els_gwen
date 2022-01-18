import { Nav } from '@components/';
import CategoriesList from '@user/categories/CategoriesList';

const UserDashboard = () => {
  return (
    <div>
      <Nav className='bg-primary' />
      <CategoriesList />
    </div>
  );
};

export default UserDashboard;
