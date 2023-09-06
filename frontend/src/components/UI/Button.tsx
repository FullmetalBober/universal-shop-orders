import Loading from './Loading';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  loadingMode?: boolean;
};

const Button = (props: Props) => {
  const { loadingMode } = props;

  return (
    <button disabled={loadingMode} {...props}>
      {loadingMode && <Loading />} {props.children}
    </button>
  );
};

export default Button;
