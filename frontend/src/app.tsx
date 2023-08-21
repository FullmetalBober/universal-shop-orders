import { useEffect } from 'preact/hooks';
import { Routes, Route } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { useIsAuthenticated } from 'react-auth-kit';
import Cookies from 'js-cookie';
import useAuth from './hooks/use-auth';
import Home from './components/Home/Home';
import { useAppDispatch } from './store';
import { fetchCategoryData } from './store/category-actions';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Layout from './components/Layout/Layout';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

const tokenCheckName = import.meta.env.VITE_AUTH_CHECKER;

export function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const setAuth = useAuth();
  const [{}, getUser] = useAxios('/api/v1/users/me', { manual: true });

  const setUser = async () => {
    const userResponse = await getUser();
    const { data: user } = userResponse.data.data;
    setAuth(user);
  };

  useEffect(() => {
    // get category data
    dispatch(fetchCategoryData());
    const token = Cookies.get(tokenCheckName);

    // if user is not authenticated then get user data
    if (!isAuthenticated() && token) setUser();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/category/:categorySlug' element={<Category />} />
        <Route path='/product/:productSlug' element={<Product />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const NotFound = () => <div>404</div>;
