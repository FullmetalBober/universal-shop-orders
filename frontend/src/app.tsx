import { useEffect } from 'preact/hooks';
import { Route, Router } from 'preact-router';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { AppDispatch, RootState } from './store';
import { fetchCategoryData } from './store/category-actions';

import './app.css';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const categories = useSelector<RootState>(state => state.category.items);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Router>
        <Route path='/' component={Home} />
      </Router>
    </>
  );
}
