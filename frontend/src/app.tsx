import { useEffect } from 'preact/hooks';
import { Route, Router } from 'preact-router';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useAppDispatch } from './store';
import { fetchCategoryData } from './store/category-actions';

import './app.css';
import Footer from './components/Footer/Footer';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Router>
        <Route path='/' component={Home} />
      </Router>
      <Footer />
    </>
  );
}
