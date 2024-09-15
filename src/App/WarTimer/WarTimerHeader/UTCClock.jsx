import DateTimeContent from '@content/DateTime.yaml';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React, { useContext, useEffect, useState } from 'react';
import { HeartbeatContext } from '../../HeartbeatProvider';
import WarTimerContent from '../WarTimer.yaml';
import * as Styles from './UtcClock.scss';

export default function UtcClock({ className }) {
  const _logger = new Logger('UtcClock');
  const { CLOCK_FORMAT_SHORT, UTC } = useContent(
    GlobalContent,
    DateTimeContent,
    WarTimerContent,
  );
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('00');
  const { tick } = useContext(HeartbeatContext);

  useEffect(() => {
    const now = new Date();
    const _hours = now.getUTCHours();
    const _minutes = now.getUTCMinutes();

    setHours(String(_hours));
    setMinutes(String(_minutes).padStart(2, '0'));
  }, [tick]);

  return (
    <div className={DOM.classNames(className, Styles.Clock)}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          <CLOCK_FORMAT_SHORT hours={hours} minutes={minutes} />
          <span className={Styles.TimeZone}>{UTC()}</span>
        </div>
      </div>
    </div>
  );
}
