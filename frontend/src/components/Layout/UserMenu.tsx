import { Link } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { userActions } from '../../store/user-slice';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const [{}, executePost] = useAxios(
    {
      url: '/api/v1/users/logout',
      method: 'POST',
    },
    { manual: true }
  );

  const { name, image } = user;

  const nameFirstLetter = name.charAt(0);

  const logoutHandle = async () => {
    await executePost();
    dispatch(userActions.signOut());
  };

  return (
    <div class='dropdown dropdown-end'>
      <label tabIndex={0} class='avatar placeholder btn btn-circle btn-ghost'>
        <div class='w-10 rounded-full bg-neutral-focus text-neutral-content'>
          {image && <img src={image} />}
          {!image && <span class='text-3xl'>{nameFirstLetter}</span>}
        </div>
      </label>
      <ul
        tabIndex={0}
        class='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
      >
        <li>
          <Link to='/profile' class='justify-between'>
            Profile
          </Link>
        </li>
        <li>
          <Link to='/setting'>Settings</Link>
        </li>
        <li>
          <button onClick={logoutHandle}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
