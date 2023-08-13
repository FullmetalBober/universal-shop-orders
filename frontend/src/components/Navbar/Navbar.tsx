import { Link } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import UserMenu from './UserMenu';

const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <header class='navbar sticky top-0 z-30 bg-base-100'>
      <div class='navbar-start'>
        <Link to='/' class='btn btn-ghost text-xl normal-case'>
          F5
        </Link>
      </div>
      <div class='navbar-center w-1/2'>
        <div class='form-control w-full'>
          <input type='text' placeholder='Пошук' class='input input-bordered' />
        </div>
      </div>
      <div class='navbar-end gap-2'>
        {!isAuthenticated() && (
          <Link to='/auth/login' className='btn'>
            Увійти
          </Link>
        )}
        {isAuthenticated() && <UserMenu />}
      </div>
    </header>
  );
};

export default Navbar;
