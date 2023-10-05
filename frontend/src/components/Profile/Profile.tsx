// import { useForm } from 'react-hook-form';
import { useGetUser } from '../../hooks/use-user';
import UserImage from '../UI/UserImage';

// type Inputs = {
//   name: string;
//   image?: File;
// };

const Profile = () => {
  const userQuery = useGetUser();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<Inputs>({
  //   mode: 'onTouched',
  //   defaultValues: {
  //     name: userQuery.data?.name,
  //   },
  // });

  // const registers = {
  //   name: register('name', {
  //     required: true,
  //   }),
  //   image: register('image'),
  // };

  return (
    <main>
      {/* <div className='w-72 rounded'> */}
      <UserImage {...userQuery.data} />
      {/* </div> */}
    </main>
  );
};

export default Profile;
