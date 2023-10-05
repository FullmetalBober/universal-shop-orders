import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../api/users';
import UserImage from '../UI/UserImage';
import { useGetUser } from '../../hooks/use-user';

const UserMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userQuery = useGetUser();

  const queryClient = useQueryClient();
  const logoutUserMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['basket'], null);
      queryClient.setQueryData(['orders'], null);
    },
  });

  if (!userQuery.data) return null;
  const { verified } = userQuery.data;

  // if user not verified redirect to verify page
  const isVerifyPage = location.pathname.includes('/auth/verify');
  if (!verified && !isVerifyPage) navigate('/auth/verify', { replace: true });

  const logoutHandle = () => {
    logoutUserMutation.mutate();
  };

  return (
    <div className='dropdown dropdown-end'>
      <label
        tabIndex={0}
        className='avatar placeholder btn btn-circle btn-ghost'
      >
        <UserImage {...userQuery.data} />
      </label>
      <ul
        tabIndex={0}
        className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
      >
        <li>
          <Link to='/profile' className='justify-between'>
            Профіль
          </Link>
        </li>
        <li>
          <Link to='/setting'>Налаштування</Link>
        </li>
        <li>
          <button onClick={logoutHandle}>Вихід</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
