import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import './index.css';
import App from './App/App';
import GuildWars from './App/GuildWars/GuildWars';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouterError />,
  },
  {
    path: 'gw-timer',
    element: <GuildWars />,
  },
]);

const $root = document.querySelector('#root');
const root = createRoot($root);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

function RouterError() {
  const routerError = useRouteError();

  return <h1>Not found</h1>;
}
