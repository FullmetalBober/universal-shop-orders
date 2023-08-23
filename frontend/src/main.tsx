import 'preact/debug';
import { render } from 'preact';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app.tsx';
import store from './store/index';
import { setupAxiosInterceptors } from './utils/axiosInterceptor.ts';
import './index.css';

setupAxiosInterceptors();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')!
);
