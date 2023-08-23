import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../store';

const Header = () => {
  const { isAuthenticated } = useAppSelector(state => state.user);

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
          {!isAuthenticated && (
            <Link to='/auth/login' className='btn'>
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
