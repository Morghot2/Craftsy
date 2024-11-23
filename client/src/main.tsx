import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './app/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar, Home, Register, Login } from './components';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
