import { useEffect } from 'preact/hooks';
import { Route, Router } from 'preact-router';
import { AuthProvider } from 'react-auth-kit';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useAppDispatch } from './store';
import { fetchCategoryData } from './store/category-actions';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Authentication from './components/Authentication/Authentication';
import 'react-multi-carousel/lib/styles.css';
import './app.css';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <AuthProvider authType={'cookie'} authName={'_auth'} cookieSecure>
      <Navbar />
      <Router>
        <Route path='/' component={Home} />
        <Route path='/category/:categorySlug' component={Category} />
        <Route path='/product/:productSlug' component={Product} />
        <Route path='/auth' component={Authentication} />
        <Route default component={notFound} />
      </Router>
      <Footer />
    </AuthProvider>
  );
}

const notFound = () => <div>404</div>;
