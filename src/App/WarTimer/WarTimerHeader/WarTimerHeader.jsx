import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Logger from '@utils/Logger';
import React from 'react';
import * as Styles from './WarTimerHeader.scss';
import UtcClock from './UtcClock';
import EodClock from './EodClock';
import Logo from '../../Logo';

export default function WarTimerHeader() {
  const _logger = new Logger('WarTimerHeader');
  const b = useContentBundle(content);

  return (
    <>
      <div className={Styles.WarTimerHeader}>
        <EodClock className={Styles.Left} />
        <Logo className={Styles.Center} />
        <UtcClock className={Styles.Right} />
      </div>
      <div className={Layout.TextCenter}>
        <b.GuildNameDecorative />
      </div>
    </>
  );
}
