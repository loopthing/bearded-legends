import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';

import React from 'react';

import About from './About';
import * as Styles from './App.scss';

export default function App({ className }) {
  const b = useContentBundle(content);

  useServiceWorker();

  return (
    <div
      className={Arrays.pack(
        className,
        Styles.App,
        Layout.FlexColumn,
        Layout.JustifyStart,
        Layout.AlignCenter,
      ).join(' ')}
    >
      <About />
    </div>
  );
}
