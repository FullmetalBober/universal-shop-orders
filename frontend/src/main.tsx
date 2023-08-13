import 'preact/debug';
import { render } from 'preact';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app.tsx';
import store from './store/index';
import './index.css';

render(
  <Provider store={store}>
    <AuthProvider authType={'cookie'} authName={'_auth'} cookieSecure>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
  document.getElementById('app')!
);
