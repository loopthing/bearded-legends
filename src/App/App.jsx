import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';

import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import * as Styles from './App.scss';

export default function App({ children }) {
  const _logger = new Logger('App');
  const _b = useContentBundle(content);
  const location = useLocation();
  const [pathname, setPathname] = useLocalStorage('BL.App.pathname');
  const navigate = useNavigate();

  void useServiceWorker();

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

  return <div className={Styles.App}>{children}</div>;
}
