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
import { SearchResult } from './pages/SearchResult';

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
        path: "/products/search/:val",
        element: <SearchResult />

      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
