import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, UseFormProps } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import AuthTemplateForm from './AuthTemplateForm';
import Button from '../UI/Button';
import { loginUser } from '../../api/users';

type Inputs = {
  email: string;
  password: string;
};

const emailValidationHandle = (value: string) => EmailValidator.validate(value);

const inputClass = (error: boolean) =>
  `input input-bordered ${error ? 'input-error' : ''}`;

const useFormParams: UseFormProps<Inputs> = {
  mode: 'onTouched',
};

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data);
    },
    onError: (error: ResponseError) => {
      toast.error(error.response?.data.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>(useFormParams);

  const registers = {
    email: register('email', {
      required: true,
      validate: emailValidationHandle,
    }),
    password: register('password', { required: true, minLength: 8 }),
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await loginUserMutation.mutateAsync(data);
    toast.success('Ви успішно увійшли!');
    navigate('/');
  };

  const buttonDisabled = !isValid || loginUserMutation.isLoading;
  return (
    <main>
      <AuthTemplateForm
        onSubmit={handleSubmit(onSubmit)}
        heading='Увійдіть зараз!'
        description={
          <>
            Якщо у вас ще немає облікового запису, ви можете{' '}
            <Link to='/auth/register' className='link-primary link font-bold'>
              зареєструватися
            </Link>
            .
          </>
        }
      >
        <div className='form-control'>
          <label for='email' className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='email'
            id='email'
            placeholder='email'
            class={inputClass(!!errors.email)}
            {...registers.email}
          />
        </div>
        <div className='form-control'>
          <label for='password' className='label'>
            <span className='label-text'>Пароль</span>
          </label>
          <input
            type='password'
            id='password'
            placeholder='пароль'
            class={inputClass(!!errors.password)}
            {...registers.password}
          />
          <label className='label'>
            <Link to='/auth/reset' className='link-hover link label-text-alt'>
              Забули пароль?
            </Link>
          </label>
        </div>
        <div className='form-control mt-6'>
          <Button
            loadingMode={loginUserMutation.isLoading}
            disabled={buttonDisabled}
            className='btn btn-primary'
          >
            Увійти
          </Button>
        </div>
      </AuthTemplateForm>
    </main>
  );
};

export default Login;
