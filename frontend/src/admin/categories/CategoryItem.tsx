import { Link } from 'react-router-dom';
import { Card } from '@components/';
import '@components/index.css';

export default function CategoryItem(props: {
  id: number;
  name: string;
  description: string;
}) {
  return (
    <Card className='category-item-card'>
      <div className='w-full'>
        <h1 className='md:text-2xl xs:text-xl font-medium'>{props.name}</h1>
        <>
          {props.description === 'null' ? (
            <p className='italic text-sm text-gray-400'>
              No description provided
            </p>
          ) : (
            <p>
              {props.description.length < 20
                ? props.description
                : `${
                    props.description.charAt(0).toUpperCase() +
                    props.description.slice(1, 20)
                  }...`}
            </p>
          )}
        </>
      </div>
      <Link
        to={`/admin/categories/${props.id}`}
        className='button bg-purple-200 w-3/4 text-center mt-8'
      >
        <span className='flex xs:flex-col'>View more details</span>
      </Link>
    </Card>
  );
}