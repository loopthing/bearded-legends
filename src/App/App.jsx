import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import { useLocalStorage } from '@hooks/useStorage';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect, useState } from 'react';

import useSwipe from '../hooks/useSwipe';
import About from './About';
import * as Styles from './App.scss';

export default function App({ className }) {
  const _logger = new Logger('App');
  const _b = useContentBundle(content);

  useServiceWorker();

  const [appVersion, availableVersion, { checkAppUpdates, updateApp }] =
    useCheckUpdates();

  const [swipeRef, swipe] = useSwipe();

  useEffect(() => {
    if (swipe === 'down') {
      window.location.reload();
    }
  }, [swipe]);

  useEffect(() => {
    void checkAppUpdates();
  }, []);

  useEffect(() => {
    if (availableVersion) {
      _logger.info(`current: ${appVersion} available: ${availableVersion}`);

      if (availableVersion !== appVersion) {
        _logger.info(`Updating ${appVersion} --> ${availableVersion}`);
        void updateApp(availableVersion);
      }
    }
  }, [availableVersion]);

  return (
    <div
      className={Arrays.pack(
        className,
        Styles.App,
        Layout.FlexColumn,
        Layout.JustifyStart,
        Layout.AlignCenter,
      ).join(' ')}
      ref={swipeRef}
    >
      <About />
    </div>
  );
}

function useCheckUpdates() {
  const _logger = new Logger('useCheckUpdates');
  const [appVersion, setAppVersion] = useLocalStorage('BL.App.Version');
  const [availableVersion, setAvailableVersion] = useState(null);

  async function checkAppUpdates() {
    return fetch('/bearded-legends/package.json')
      .then((response) => response.json())
      .then((result) => {
        if (result && result.version) {
          setAvailableVersion(result.version);
        }
        return result.version;
      });
  }

  async function updateApp(version) {
    setAppVersion(version);

    return new Promise((resolve) => {
      resolve(window.location.reload());
    }, 0);
  }

  return [appVersion, availableVersion, { checkAppUpdates, updateApp }];
}
