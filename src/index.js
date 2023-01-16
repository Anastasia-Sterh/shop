import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from './components/SignIn';
import { Main } from './pages/Main';
import { AboutMe } from './pages/AboutMe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

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
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


