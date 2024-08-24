import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useContext, useEffect, useState } from 'react';
import * as Styles from './UtcClock.scss';
import { HeartbeatContext } from '../../HeartbeatProvider';

export default function EodClock({ className }) {
  const _logger = new Logger('EodClock');
  const b = useContentBundle(content);
  const [isPastEod, setIsPastEod] = useState(true);
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const { tick } = useContext(HeartbeatContext);

  useEffect(() => {
    const now = new Date();
    let _hours = now.getUTCHours() - 12;
    let _minutes = now.getUTCMinutes();
    let _seconds = now.getUTCSeconds();
    let _isPastEod = _hours >= 0;

    if (!_isPastEod) {
      _hours = Math.abs(_hours);
      _minutes = 59 - _minutes;
      _seconds = 59 - _seconds;
    }

    setIsPastEod(_isPastEod);
    setHours(String(_hours));
    setMinutes(String(_minutes).padStart(2, '0'));
    setSeconds(String(_seconds).padStart(2, '0'));
  }, [tick]);

  return (
    <div className={Arrays.pack(className, Styles.Clock).join(' ')}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          <span className={Styles.TimeZone}>
            <b.EOD />
            {isPastEod ? b.PlusSign() : b.MinusSign()}
          </span>
          {isPastEod ? (
            <b.CLOCK_FORMAT_SHORT hours={hours} minutes={minutes} />
          ) : (
            <b.CLOCK_FORMAT_LONG
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          )}
        </div>
      </div>
    </div>
  );
}
