import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getUser, logoutUser } from '../../api/users';

const UserMenu = () => {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

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
  const { name, image } = userQuery.data;

  const nameFirstLetter = name.charAt(0);

  const logoutHandle = () => {
    logoutUserMutation.mutate();
  };

  return (
    <div className='dropdown dropdown-end'>
      <label
        tabIndex={0}
        className='avatar placeholder btn btn-circle btn-ghost'
      >
        <div className='w-10 rounded-full bg-neutral-focus text-neutral-content'>
          {image && <img src={image} />}
          {!image && <span className='text-3xl'>{nameFirstLetter}</span>}
        </div>
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
