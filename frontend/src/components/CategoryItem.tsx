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
  disabled?:boolean
}) {
  return (
    <Card
      className={`category-item-card border-gray-400 mx-auto ${
        props.disabled && 'bg-gray-300'
      }`}
    >
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
        className={`rounded-full py-2 px-4 w-3/4 text-center mt-8
          ${
            (!props.disabled && props.buttonColor) ??
            'bg-purple-200 hover:bg-secondary hover:text-white'
          }
          ${props.disabled && 'bg-gray-500 text-white hover:bg-gray-700'}
        `}
      >
        <span className='flex xs:flex-col'>
          {props.buttonText ?? 'View more details'}
        </span>
      </Link>
    </Card>
  );
}
