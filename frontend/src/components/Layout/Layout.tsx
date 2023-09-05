import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
