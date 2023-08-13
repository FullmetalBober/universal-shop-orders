import { Link } from 'react-router-dom';
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
  console.log(userData, loading, error); //! remove

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
            <Link to='/auth/register' class='link-primary link font-bold'>
              зареєструватися
            </Link>
            .
          </>
        }
      >
        <div class='form-control'>
          <label for='email' class='label'>
            <span class='label-text'>Email</span>
          </label>
          <input
            type='email'
            id='email'
            placeholder='email'
            class={inputClass(!!errors.email)}
            {...registers.email}
          />
        </div>
        <div class='form-control'>
          <label for='password' class='label'>
            <span class='label-text'>Пароль</span>
          </label>
          <input
            type='password'
            id='password'
            placeholder='password'
            class={inputClass(!!errors.password)}
            {...registers.password}
          />
          <label class='label'>
            <Link to='/auth/reset' class='link-hover link label-text-alt'>
              Забули пароль?
            </Link>
          </label>
        </div>
        <div class='form-control mt-6'>
          <button disabled={!isValid} class='btn btn-primary'>
            Увійти
          </button>
        </div>
      </AuthTemplateForm>
    </main>
  );
};

export default Login;
