import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import * as Layout from '@styles/Layout.scss';
import React from 'react';
import Logo from '../../Logo';
import EodClock from './EodClock';
import UtcClock from './UtcClock';
import * as Styles from './WarTimerHeader.scss';

export default function WarTimerHeader() {
  const { GuildNameDecorative } = useContent(GlobalContent);

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
