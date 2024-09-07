import globalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Logger from '@utils/Logger';
import React from 'react';
import Logo from '../../Logo';
import EodClock from './EodClock';
import UtcClock from './UtcClock';
import * as Styles from './WarTimerHeader.scss';

export default function WarTimerHeader() {
  const _logger = new Logger('WarTimerHeader');
  const { GuildNameDecorative } = useContentBundle(globalContent);

  return (
    <>
      <div className={Styles.WarTimerHeader}>
        <EodClock className={Styles.Left} />
        <Logo className={Styles.Center} />
        <UtcClock className={Styles.Right} />
      </div>
      <div className={Layout.TextCenter}>
        <GuildNameDecorative />
      </div>
    </>
  );
}
