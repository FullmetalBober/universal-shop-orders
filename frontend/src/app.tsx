import { useEffect } from 'preact/hooks';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useAppDispatch, useAppSelector } from './store';
import { fetchUserData } from './store/user-actions';
import { createBasket } from './store/basket-actions';
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

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchCategoryData());
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    console.log('basket create effect');
    if (user.verified && !user.basket) dispatch(createBasket());
  }, [user.verified, user.basket]);

  // if user not verified redirect to verify page
  const isVerifyPage = location.pathname.includes('/auth/verify');
  if (isAuthenticated && !user.verified && !isVerifyPage)
    navigate('/auth/verify', { replace: true });
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
