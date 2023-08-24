import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

const useAuth = () => {
  const dispatch = useDispatch();

  return (user: User) => {
    if (!user.verified) return;

    dispatch(userActions.login(user));
  };
};

export default useAuth;
