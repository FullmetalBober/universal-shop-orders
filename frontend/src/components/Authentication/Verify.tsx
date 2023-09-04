import { useEffect } from 'preact/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import Button from '../UI/Button';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUserData } from '../../store/user-actions';
import { userActions } from '../../store/user-slice';

const Verify = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { emailToken } = useParams();
  const { user } = useAppSelector(state => state.user);
  const [
    { data: activateData, loading: activateLoading, error: activateError },
  ] = useAxios(
    {
      url: `/api/v1/users/activate/${emailToken}`,
      method: 'PATCH',
    },
    { manual: !emailToken }
  );
  const [{ loading: removeLoading }, removeUser] = useAxios(
    {
      url: `/api/v1/users/deleteMe/withoutVerified`,
      method: 'DELETE',
    },
    { manual: true }
  );

  if (activateData) {
    dispatch(fetchUserData());
    navigate('/');
  }

  const removeUserHandler = async () => {
    dispatch(userActions.logout());
    await removeUser();
    navigate('/auth/register');
  };

  useEffect(() => {
    toast.warning('Будь ласка, підтвердьте ваш email!');
  }, []);

  const buttonLoading = activateLoading || removeLoading;
  return (
    <main>
      <section className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>
              Підтвердьте email {user.email}
            </h1>
            <p className='py-6'>
              {!activateError &&
                `Схоже, що ви ще не підтвердили свій email. Будь ласка, перевірте
              свою поштову скриньку і перейдіть за посиланням, яке ми вам
              надіслали.`}
              {activateError &&
                `Щось пішло не так. Будь ласка, натисніть на кнопку нижче, щоб
                знову зареєструватися.`}
            </p>
            <Button
              onClick={removeUserHandler}
              loadingMode={buttonLoading}
              className='btn btn-warning'
            >
              Зареєструватися знову
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Verify;
