type Props = {
  name?: string;
  image?: string;
  className?: string;
};

const UserImage: React.FC<Props> = props => {
  const { image, name = '/' } = props;

  const nameFirstLetter = name.charAt(0);

  return (
    <div className='avatar'>
      <div
        className='w-10 rounded-full bg-neutral-focus text-neutral-content text-center'
        {...props}
      >
        {image && <img src={image} />}
        {!image && <span className='text-3xl'>{nameFirstLetter}</span>}
      </div>
    </div>
  );
};

export default UserImage;
