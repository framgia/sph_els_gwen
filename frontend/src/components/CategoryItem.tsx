import { Link } from 'react-router-dom';
import { Card } from '@components/';
import '@components/index.css';

export default function CategoryItem(props: {
  id: number;
  name: string;
  description: string;
  link: string;
  buttonColor?: string;
  buttonText?: string;
}) {
  return (
    <Card className='category-item-card border-gray-400 mx-auto'>
      <div className='w-full'>
        <p className='md:text-2xl xs:text-xl font-medium'>{props.name}</p>
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
        to={props.link}
        className={`button w-3/4 text-center mt-8 ${
          props.buttonColor ?? 'bg-purple-200'
        }`}
      >
        <span className='flex xs:flex-col'>
          {props.buttonText ?? 'View more details'}
        </span>
      </Link>
    </Card>
  );
}
