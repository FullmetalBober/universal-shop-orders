import { Link } from 'react-router-dom';

interface IProps {
  children: JSX.Element | JSX.Element[];
  value: number;
  to: string;
}

const IndicatorLink = (props: IProps) => {
  const { children, value, to } = props;

  const isVisible = value > 0;
  return (
    <Link to={to} className='group btn btn-ghost indicator text-2xl'>
      {isVisible && (
        <span className='badge indicator-item badge-secondary mr-1 mt-1'>
          {value}
        </span>
      )}
      <button>{children}</button>
    </Link>
  );
};

export default IndicatorLink;
