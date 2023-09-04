import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-base-200 p-10 text-base-content'>
      <div>
        <Link to='/' className='btn btn-ghost text-4xl normal-case'>
          F5
        </Link>
      </div>
      <div>
        <span className='footer-title'>Телеграм</span>
        <a className='link-hover link'>0123456789</a>
        <a className='link-hover link'>0123456789</a>
      </div>
      <div>
        <span className='footer-title'>Вайбер</span>
        <a className='link-hover link'>0123456789</a>
        <a className='link-hover link'>0123456789</a>
      </div>
      <div>
        <span className='footer-title'>Пошта</span>
        <a className='link-hover link'>moderator@example.com</a>
        <a className='link-hover link'>moderator@example.com</a>
      </div>
    </footer>
  );
};

export default Footer;
