import content from '@content/Content.yaml';
import useCheckUpdates from '@hooks/useCheckUpdates';
import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import useSwipe from '@hooks/useSwipe';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect } from 'react';
// import Hammer from 'react-hammerjs';
// import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_VERTICAL } from 'hammerjs';

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

  useEffect(() => void checkAppUpdates(), []);

  useEffect(() => {
    if (availableVersion) {
      _logger.info(`current: ${appVersion} available: ${availableVersion}`);

      if (availableVersion !== appVersion) {
        _logger.info(`Updating ${appVersion} --> ${availableVersion}`);
        void updateApp(availableVersion);
      }
    }
  }, [availableVersion]);

  // const onPan = (domEvent) => {
  //   if (Math.abs(domEvent.deltaX) < Math.abs(domEvent.deltaY)) {
  //     if (domEvent.deltaY > 30) {
  //       alert('Pulled down!');
  //     }
  //   }
  // };

  return (
    // <Hammer
    //   onPan={onPan}
    //   options={{
    //     // touchAction: 'compute',
    //     recognizers: { pan: { direction: DIRECTION_VERTICAL } },
    //   }}
    // >
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
    // </Hammer>
  );
}
