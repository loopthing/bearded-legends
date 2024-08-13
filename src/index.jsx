import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import About from './App/About';
import App from './App/App';
import WarTimer from './App/WarTimer/WarTimer';
import './index.css';

const basename = '/bearded-legends';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <About />,
    },
    {
      path: 'about',
      element: <About />,
    },
    {
      path: 'war-timer',
      element: <WarTimer />,
    },
  ],
  {
    basename,
  },
);

const $root = document.querySelector('#root');
const root = createRoot($root);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <WarTimer /> */}
  </React.StrictMode>,
);

function RouterError() {
  const routerError = useRouteError();

  return <h1>Error</h1>;
}
