import { useEffect } from 'preact/hooks';
import { Routes, Route } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { useIsAuthenticated } from 'react-auth-kit';
import useAuth from './hooks/use-auth';
import Home from './components/Home/Home';
import { useAppDispatch } from './store';
import { fetchCategoryData } from './store/category-actions';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Login from './components/Authentication/Login';
import Layout from './components/Layout/Layout';
import 'react-multi-carousel/lib/styles.css';
import './app.css';

export function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const setAuth = useAuth();
  const [{}, getUser] = useAxios('/api/v1/users/me');

  useEffect(() => {
    // get category data
    dispatch(fetchCategoryData());
    if (!isAuthenticated())
      // if user is not authenticated then get user data
      (async () => {
        const userResponse = await getUser();
        const { data: user } = userResponse.data.data;
        setAuth(user);
      })();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/category/:categorySlug' element={<Category />} />
        <Route path='/product/:productSlug' element={<Product />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const NotFound = () => <div>404</div>;
