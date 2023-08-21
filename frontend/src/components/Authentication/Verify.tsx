import { useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Button from '../UI/Button';
import getMe from '../../utils/getMe';
import useAuth from '../../hooks/use-auth';

const Verify = () => {
  const setAuth = useAuth();
  const navigate = useNavigate();
  const { emailToken } = useParams();
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
      url: `/api/v1/users/nonVerified/deleteMe`,
      method: 'DELETE',
    },
    { manual: true }
  );

  const setUser = async () => {
    const user = await getMe();
    setAuth(user);
  };

  if (activateData) {
    setUser();
    navigate('/');
  }

  const removeUserHandler = async () => {
    await removeUser();
    navigate('/auth/register');
  };

  const buttonLoading = activateLoading || removeLoading;
  return (
    <main>
      <section class='hero min-h-screen bg-base-200'>
        <div class='hero-content text-center'>
          <div class='max-w-md'>
            <h1 class='text-5xl font-bold'>Підтвердження email</h1>
            <p class='py-6'>
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
              class='btn btn-warning'
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
