import { Link } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../store';
import Loading from '../UI/Loading';
import IndicatorLink from '../UI/IndicatorLink';

const Header = () => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.user);
  const { basket } = useAppSelector(state => state.basket);
  const products = basket?.products || [];

  let basketItemsCount = 0;
  if (isAuthenticated)
    basketItemsCount = products.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header class='sticky top-0 z-30 bg-base-100 bg-opacity-90 shadow-sm backdrop:blur'>
      <nav class='navbar'>
        <div class='navbar-start'>
          <Link to='/' class='btn btn-ghost text-xl normal-case'>
            F5
          </Link>
        </div>
        <div class='navbar-center w-1/2'>
          <div class='form-control w-full'>
            <input
              type='text'
              placeholder='Пошук'
              class='input input-bordered input-ghost'
            />
          </div>
        </div>
        <div class='navbar-end gap-2'>
          {isAuthenticated && (
            <IndicatorLink value={basketItemsCount} to='/basket'>
              <SlBasket />
            </IndicatorLink>
          )}

          {isLoading && <Loading />}
          {!isLoading && !isAuthenticated && (
            <Link to='/auth/login' class='btn'>
              Увійти
            </Link>
          )}
          {isAuthenticated && <UserMenu />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
