import { useEffect } from 'preact/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { activateUser, getUser, removeUser } from '../../api/users';
import Button from '../UI/Button';

const Verify = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { emailToken } = useParams();

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const activateUserQuery = useQuery({
    queryKey: ['activateUser', emailToken],
    queryFn: () => activateUser(emailToken!),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      toast.success('Ви успішно підтвердили свій email!');
      navigate('/');
    },
    onError: (error: ResponseError) => {
      toast.error(error.response?.data.message);
    },
    enabled: !!emailToken,
    cacheTime: 0,
  });

  const removeUserMutation = useMutation({
    mutationFn: () => removeUser('withoutVerified'),
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      navigate('/auth/register');
    },
  });

  const removeUserHandler = () => {
    removeUserMutation.mutate();
  };

  useEffect(() => {
    toast.warning('Будь ласка, підтвердьте ваш email!');
  }, []);

  const buttonLoading =
    activateUserQuery.isInitialLoading || removeUserMutation.isLoading;
  return (
    <main>
      <section className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>
              Підтвердьте email {userQuery.data?.email}
            </h1>
            <p className='py-6'>
              {!emailToken &&
                `Схоже, що ви ще не підтвердили свій email. Будь ласка, перевірте
              свою поштову скриньку і перейдіть за посиланням, яке ми вам
              надіслали.`}
              {activateUserQuery.isError &&
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
