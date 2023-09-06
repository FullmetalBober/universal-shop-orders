import 'preact/debug';
import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App } from './app.tsx';
import './index.css';

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

const queryClient = new QueryClient();

//? Is this necessary?
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('app')!
);
