import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useContext, useEffect, useState } from 'react';
import * as Styles from './UtcClock.scss';
import { HeartbeatContext } from '../../HeartbeatProvider';

export default function UtcClock({ className }) {
  const _logger = new Logger('UtcClock');
  const b = useContentBundle(content);
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
    <div className={Arrays.pack(className, Styles.Clock).join(' ')}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          <b.CLOCK_FORMAT_SHORT hours={hours} minutes={minutes} />
          <span className={Styles.TimeZone}>
            <b.UTC />
          </span>
        </div>
      </div>
    </div>
  );
}
