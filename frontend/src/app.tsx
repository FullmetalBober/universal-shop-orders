import { Route, Router } from 'preact-router';
import Home from './components/Home/Home';

import './app.css';
import Navbar from './components/Navbar/Navbar';

export function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Route path='/' component={Home} />
      </Router>
    </>
  );
}
