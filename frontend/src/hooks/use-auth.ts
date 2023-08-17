import { useSignIn } from 'react-auth-kit';

const userExpiresIn = 60 * 60 * 24 * 15; // 15 days
const tokenType = 'Bearer';

const useAuth = () => {
  const signIn = useSignIn();

  return (user: User) => {
    // const expiresThrough =
    //   new Date(responseData.expiresIn).getTime() - new Date().getTime();
    // const userExpiresIn = Math.floor(expiresThrough / 1000 / 60);

    signIn({
      token: 'Hi there!',
      expiresIn: userExpiresIn,
      tokenType: tokenType,
      authState: user,
    });
  };
};

export default useAuth;
