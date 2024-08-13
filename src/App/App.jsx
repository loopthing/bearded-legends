import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';

import React, { useEffect } from 'react';

import About from './About';
import * as Styles from './App.scss';
import useSwipe from '../hooks/useSwipe';

export default function App({ className }) {
  const _b = useContentBundle(content);

  useServiceWorker();
  const [swipeRef, swipe] = useSwipe();

  useEffect(() => {
    if (swipe === 'down') {
      window.location.reload();
    }
  }, [swipe]);

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
