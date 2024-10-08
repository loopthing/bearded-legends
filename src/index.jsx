import '@styles/Color.scss';
import '@styles/Typography.scss';
import Logger from '@utils/Logger';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'reset-css';
import About from './App/About/About';
import App from './App/App';
import Settings from './App/Settings/Settings';
import Timestamp from './App/Timestamp/Timestamp';
import WarTimer from './App/WarTimer/WarTimer';
import './index.css';

const BASENAME = '/bearded-legends';
const _logger = new Logger('index');
const $root = document.querySelector('#root');
const root = createRoot($root);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <App>
          <About />
        </App>
      ),
      errorElement: (
        <App>
          <About />
        </App>
      ),
    },
    {
      path: 'about',
      element: (
        <App>
          <About />
        </App>
      ),
    },
    {
      path: 'settings',
      element: (
        <App>
          <Settings />
        </App>
      ),
    },
    {
      path: 'timestamp',
      element: (
        <App>
          <Timestamp />
        </App>
      ),
    },
    {
      path: 'war-timer',
      element: (
        <App>
          <WarTimer />
        </App>
      ),
    },
  ],
  { basename: BASENAME },
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

window.root = root;
