import { useSignIn } from 'react-auth-kit';
import Cookies from 'js-cookie';

const tokenCheckName = import.meta.env.VITE_AUTH_CHECKER;
const expiresInDefault = 60 * 24 * 14; // 14 days
const tokenType = 'Bearer';

const useAuth = () => {
  const signIn = useSignIn();

  return (user: User) => {
    if (!user.verified) return;
    const expiresInCookie = Cookies.get(tokenCheckName);

    let expiresIn = expiresInDefault;
    if (expiresInCookie && parseInt(expiresInCookie)) {
      const expiresThrough =
        new Date(+expiresInCookie).getTime() - new Date().getTime();
      expiresIn = Math.floor(expiresThrough / 1000 / 60);
    }

    if (expiresIn >= expiresInDefault) expiresIn = expiresInDefault;
    signIn({
      token: 'Hi there!',
      expiresIn: expiresIn,
      tokenType: tokenType,
      authState: user,
    });
  };
};

export default useAuth;
