import Loading from './Loading';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  loadingMode?: boolean;
}

const Button = (props: IProps) => {
  const { loadingMode } = props;

  return (
    <button {...props}>
      {loadingMode && <Loading />} {props.children}
    </button>
  );
};

export default Button;
