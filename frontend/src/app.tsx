// import { useEffect } from 'preact/hooks';
import { Route, Router } from 'preact-router';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
// import { useAppDispatch } from './store';
// import { fetchCategoryData } from './store/category-actions';

import './app.css';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';

export function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchCategoryData());
  // }, [dispatch]);

  return (
    <>
      <Navbar />
      <Router>
        <Route path='/' component={Home} />
        <Route path='/category/:categorySlug' component={Category} />
        <Route default component={notFound} />
      </Router>
      <Footer />
    </>
  );
}

const notFound = () => <div>404</div>;
