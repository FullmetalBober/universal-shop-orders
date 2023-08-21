import { useEffect } from 'preact/hooks';
import { Routes, Route } from 'react-router-dom';
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
import Verify from './components/Authentication/Verify';
import Layout from './components/Layout/Layout';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import getMe from './utils/getMe';

const tokenCheckName = import.meta.env.VITE_AUTH_CHECKER;

export function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const setAuth = useAuth();

  const setUser = async () => {
    const user = await getMe();
    console.log(user);
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
        <Route path='/auth/verify/:emailToken?' element={<Verify />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const NotFound = () => <div>404</div>;
