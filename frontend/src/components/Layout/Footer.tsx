import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class='footer bg-base-200 p-10 text-base-content'>
      <div>
        <Link to='/' class='btn btn-ghost text-4xl normal-case'>
          F5
        </Link>
      </div>
      <div>
        <span class='footer-title'>Телеграм</span>
        <a class='link-hover link'>0123456789</a>
        <a class='link-hover link'>0123456789</a>
      </div>
      <div>
        <span class='footer-title'>Вайбер</span>
        <a class='link-hover link'>0123456789</a>
        <a class='link-hover link'>0123456789</a>
      </div>
      <div>
        <span class='footer-title'>Пошта</span>
        <a class='link-hover link'>moderator@example.com</a>
        <a class='link-hover link'>moderator@example.com</a>
      </div>
    </footer>
  );
};

export default Footer;
