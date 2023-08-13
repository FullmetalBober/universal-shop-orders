import { Link } from 'preact-router';
import { useForm, SubmitHandler, UseFormProps } from 'react-hook-form';
import useAxios from 'axios-hooks';
import * as EmailValidator from 'email-validator';
import AuthTemplateForm from './AuthTemplateForm';

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
  const [{ data: userData, loading, error }, executePost] = useAxios(
    {
      url: '/api/v1/users/login',
      method: 'POST',
    },
    { manual: true }
  );

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
    await executePost({ data });
    console.log(userData);
  };

  return (
    <main>
      <AuthTemplateForm
        onSubmit={handleSubmit(onSubmit)}
        heading='Увійдіть зараз!'
        description={
          <>
            Якщо у вас ще немає облікового запису, ви можете{' '}
            <Link href='/auth/register' className='link link-primary font-bold'>
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
            className={inputClass(!!errors.email)}
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
            placeholder='password'
            className={inputClass(!!errors.password)}
            {...registers.password}
          />
          <label className='label'>
            <Link href='/auth/reset' className='link-hover link label-text-alt'>
              Забули пароль?
            </Link>
          </label>
        </div>
        <div className='form-control mt-6'>
          <button disabled={!isValid} className='btn btn-primary'>
            Увійти
          </button>
        </div>
      </AuthTemplateForm>
    </main>
  );
};

export default Login;
