import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, UseFormProps } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import AuthTemplateForm from './AuthTemplateForm';
import Button from '../UI/Button';
import { AxiosError } from 'axios';

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

  const [{ loading }, executePost] = useAxios(
    {
      url: '/api/v1/users/signup',
      method: 'POST',
    },
    { manual: true }
  );

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
    try {
      await executePost({ data });

      toast.success('Ви успішно зареєструвались!');
      navigate('/auth/verify');
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      const errorMessages = error.response?.data.message;
      toast.error(errorMessages);
    }
  };

  const buttonDisabled = !isValid || loading;
  return (
    <main>
      <AuthTemplateForm
        onSubmit={handleSubmit(onSubmit)}
        heading='Зареєструйтесь зараз!'
        description={
          <>
            Якщо ви вже маєте обліковий запис, ви можете{' '}
            <Link to='/auth/login' class='link-primary link font-bold'>
              авторизуватися
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
          <label for='name' class='label'>
            <span class='label-text'>Ім'я</span>
          </label>
          <input
            type='name'
            id='name'
            placeholder="ім'я"
            class={inputClass(!!errors.name)}
            {...registers.name}
          />
        </div>
        <div class='form-control'>
          <label for='password' class='label'>
            <span class='label-text'>Пароль</span>
          </label>
          <input
            type='password'
            id='password'
            placeholder='пароль'
            class={inputClass(!!errors.password)}
            {...registers.password}
          />
        </div>
        <div class='form-control'>
          <label for='passwordConfirm' class='label'>
            <span class='label-text'>Підтвердження паролю</span>
          </label>
          <input
            type='password'
            id='passwordConfirm'
            placeholder='підтвердження паролю'
            class={inputClass(!!errors.passwordConfirm)}
            {...registers.passwordConfirm}
          />
        </div>
        <div class='form-control mt-6'>
          <Button
            loadingMode={loading}
            disabled={buttonDisabled}
            class='btn btn-primary'
          >
            Зареєструватися
          </Button>
        </div>
      </AuthTemplateForm>
    </main>
  );
};

export default Register;
