import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store.ts'
import {Provider} from 'react-redux'
import { MainRoutes } from './routes/routes.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <MainRoutes/>
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
