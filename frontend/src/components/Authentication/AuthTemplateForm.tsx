import { JSX } from 'preact/jsx-runtime';

type Props = {
  children: JSX.Element | JSX.Element[];
  heading: JSX.Element | string;
  description: JSX.Element | string;
  onSubmit: (event: Event) => void;
};

const AuthTemplateForm = (props: Props) => {
  const { children, heading, description, onSubmit } = props;

  return (
    <div className='hero min-h-new-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>{heading}</h1>
          <p className='py-6'>{description}</p>
        </div>
        <div className='card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl'>
          <form onSubmit={onSubmit} className='card-body'>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplateForm;
