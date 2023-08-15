import { Link, useNavigate } from 'react-router-dom';
import { useSignOut, useIsAuthenticated } from 'react-auth-kit';
import { useEffect } from 'preact/hooks';

/**
 * Use only when you need to logout not from the current page
 **/
const HardLogout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  useEffect(() => {
    // Check if the previous URL has the same domain
    const previousUrl = document.referrer;
    const currentUrl = window.location.href;

    if (!previousUrl) return navigate('/');

    // Get the domain name
    const previousDomain = new URL(previousUrl).hostname;
    const currentDomain = new URL(currentUrl).hostname;

    if (previousDomain === currentDomain) {
      if (isAuthenticated()) signOut();
      navigate('/');
    }
  }, [navigate]);

  return (
    <main>
      <section class='hero min-h-screen bg-base-200'>
        <div class='hero-content text-center'>
          <div class='max-w-md'>
            <h1 class='text-5xl font-bold'>Жорсткий вихід</h1>
            <p class='py-6'>
              Схоже, щось пішло не так. Натисніть на кнопку нижче, щоб
              повернутися на головну сторінку.
            </p>
            <Link to='/' class='btn btn-primary'>
              Повернутися на головну сторінку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HardLogout;
