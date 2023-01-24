import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './index.css';

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <SignUp />
      },
      {
        path: 'signIn',
        element: <SignIn />
      },

      {
        path: 'main',
        element: <Main />
      },

      {
        path: 'aboutMe',
        element: <AboutMe />
      },

      {
        path: 'pageOfProduct/:productId',
        element: <PageOfProduct />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


