import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Verify from './components/Authentication/Verify';
import Basket from './components/Basket/Basket';
import Orders from './components/Orders/Orders';
import Layout from './components/Layout/Layout';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/category/:categorySlug' element={<Category />} />
        <Route path='/product/:productSlug' element={<Product />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/verify/:emailToken?' element={<Verify />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/orders/:status' element={<Orders />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const NotFound = () => <div>404</div>;
