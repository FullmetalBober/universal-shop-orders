import 'preact/debug';
import { render } from 'preact';
// import { Provider } from 'react-redux';
import { App } from './app.tsx';
// import store from './store/index';
import './index.css';

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')!
// );
render(<App />, document.getElementById('app')!);
