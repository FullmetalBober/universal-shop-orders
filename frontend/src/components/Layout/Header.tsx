import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SlBasket } from 'react-icons/sl';
import UserMenu from './UserMenu';
import { getBasket } from '../../api/baskets';
import { getUser } from '../../api/users';
import Loading from '../UI/Loading';
import IndicatorLink from '../UI/IndicatorLink';

const Header = () => {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: document.cookie.includes(import.meta.env.VITE_AUTH_CHECKER),
  });

  const basketQuery = useQuery({
    queryKey: ['basket'],
    queryFn: () => getBasket(),
    enabled: !!userQuery.data && userQuery.data.verified,
  });
  const products = basketQuery.data?.products || [];

  let basketItemsCount = 0;
  basketItemsCount = products.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className='sticky top-0 z-30 bg-base-100 bg-opacity-90 shadow-sm backdrop:blur'>
      <nav className='navbar'>
        <div className='navbar-start'>
          <Link to='/' className='btn btn-ghost text-xl normal-case'>
            F5
          </Link>
        </div>
        <div className='navbar-center w-1/2'>
          <div className='form-control w-full'>
            <input
              type='text'
              placeholder='Пошук'
              className='input input-bordered input-ghost'
            />
          </div>
        </div>
        <div className='navbar-end gap-2'>
          {basketQuery.data && (
            <IndicatorLink value={basketItemsCount} to='/basket'>
              <SlBasket />
            </IndicatorLink>
          )}

          {userQuery.isInitialLoading && <Loading />}
          {!userQuery.data && (
            <Link to='/auth/login' className='btn'>
              Увійти
            </Link>
          )}
          {userQuery.data && <UserMenu />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
