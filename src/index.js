import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from './components/SignIn';
import { Main } from './pages/Main';
import { AboutMe } from './pages/AboutMe';
import { SignUp } from './components/SignUp';
import { PageOfProduct } from './pages/PageOfProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { Provider } from 'react-redux';
import { store } from './toolkit/store';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/signup',
        element: <SignUp />
      },

      {
        path: '/signin',
        element: <SignIn />
      },

      {
        path: '/main',
        element: <Main />
      },

      {
        path: '/aboutme',
        element: <AboutMe />
      },

      {
        path: '/product/:productId',
        element: <PageOfProduct />
      },

      {
        path: "*",
        element: <NotFound />

      },

      {
        path: "/cart",
        element: <Cart />
      }


    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
