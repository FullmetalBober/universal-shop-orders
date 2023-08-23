import { useEffect } from 'preact/hooks';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { useAppDispatch } from './store';
import { fetchUserData } from './store/user-actions';
import { fetchCategoryData } from './store/category-actions';
// import { fetchBasketData } from './store/basket-actions';
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
    dispatch(fetchUserData());
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
