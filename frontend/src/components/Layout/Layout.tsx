import Footer from './Footer';
import Header from './Header';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
