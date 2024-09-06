import useServiceWorker from '@hooks/useServiceWorker';
import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';

import React, { useEffect } from 'react';

import useZoom from '@hooks/useZoom';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styles from './App.scss';
import HeartbeatProvider from './HeartbeatProvider';

export default function App({ children }) {
  const _logger = new Logger('App');
  const location = useLocation();
  const [pathname, setPathname] = useLocalStorage('BL.App.pathname');
  const navigate = useNavigate();

  void useServiceWorker();
  void useZoom();

  useEffect(() => {
    if (pathname !== null && pathname !== location.pathname) {
      _logger.log(`navigate to ${pathname}`);
      navigate(pathname);
    }
  }, []);

  useEffect(() => {
    _logger.log(location);
    setPathname(location.pathname);
  }, [location]);

  return (
    <HeartbeatProvider>
      <div className={Styles.App}>{children}</div>
    </HeartbeatProvider>
  );
}
