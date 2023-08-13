import { useEffect } from 'preact/hooks';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { useAppDispatch } from './store';
import { fetchCategoryData } from './store/category-actions';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Login from './components/Authentication/Login';
import 'react-multi-carousel/lib/styles.css';
import './app.css';
import Layout from './components/Layout/Layout';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:categorySlug' element={<Category />} />
        <Route path='/product/:productSlug' element={<Product />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const NotFound = () => <div>404</div>;
