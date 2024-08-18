import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import * as Styles from './WarTimerHeader.scss';
import Clock from './UTCClock';

export default function WarTimerHeader({ tick }) {
  const _logger = new Logger('WarTimerHeader');
  const b = useContentBundle(content);

  return (
    <div
      className={Arrays.pack(
        Styles.WarTimerHeader,
        Layout.Flex,
        Layout.JustifyCenter,
        Layout.AlignCenter,
      ).join(' ')}
    >
      <div>
        <div
          className={Arrays.pack(
            Layout.Flex,
            Layout.JustifyCenter,
            Layout.AlignCenter,
            Layout.NoWrap,
          ).join(' ')}
        >
          <Clock className={Styles.Clock} tick={tick} />
        </div>
        <div className={Layout.TextCenter}>
          <b.GuildNameDecorative />
        </div>
      </div>
    </div>
  );
}
