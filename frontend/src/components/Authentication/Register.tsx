import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, UseFormProps } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import { registerUser } from '../../api/users';
import AuthTemplateForm from './AuthTemplateForm';
import Button from '../UI/Button';

type Inputs = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const emailValidationHandle = (value: string) => EmailValidator.validate(value);

const inputClass = (error: boolean) =>
  `input input-bordered ${error ? 'input-error' : ''}`;

const useFormParams: UseFormProps<Inputs> = {
  mode: 'onTouched',
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data);
    },
    onError: (error: ResponseError) => {
      toast.error(error.response?.data.message);
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>(useFormParams);

  const passwordConfirmValidationHandle = (value: string) =>
    value === watch('password');

  const registers = {
    email: register('email', {
      required: true,
      validate: emailValidationHandle,
    }),
    name: register('name', { required: true }),
    password: register('password', { required: true, minLength: 8 }),
    passwordConfirm: register('passwordConfirm', {
      required: true,
      minLength: 8,
      validate: passwordConfirmValidationHandle,
    }),
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await registerUserMutation.mutateAsync(data);
    toast.success('Ви успішно зареєструвались!');
    navigate('/auth/verify');
  };

  const buttonDisabled = !isValid || registerUserMutation.isLoading;
  return (
    <main>
      <AuthTemplateForm
        onSubmit={handleSubmit(onSubmit)}
        heading='Зареєструйтесь зараз!'
        description={
          <>
            Якщо ви вже маєте обліковий запис, ви можете{' '}
            <Link to='/auth/login' className='link-primary link font-bold'>
              авторизуватися
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
          <label for='name' className='label'>
            <span className='label-text'>Ім'я</span>
          </label>
          <input
            type='name'
            id='name'
            placeholder="ім'я"
            class={inputClass(!!errors.name)}
            {...registers.name}
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
        </div>
        <div className='form-control'>
          <label for='passwordConfirm' className='label'>
            <span className='label-text'>Підтвердження паролю</span>
          </label>
          <input
            type='password'
            id='passwordConfirm'
            placeholder='підтвердження паролю'
            class={inputClass(!!errors.passwordConfirm)}
            {...registers.passwordConfirm}
          />
        </div>
        <div className='form-control mt-6'>
          <Button
            loadingMode={registerUserMutation.isLoading}
            disabled={buttonDisabled}
            className='btn btn-primary'
          >
            Зареєструватися
          </Button>
        </div>
      </AuthTemplateForm>
    </main>
  );
};

export default Register;
