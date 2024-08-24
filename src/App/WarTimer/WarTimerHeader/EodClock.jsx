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
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { tick } = useContext(HeartbeatContext);

  useEffect(() => {
    const now = new Date();
    let _hours = now.getUTCHours();
    let _minutes = now.getUTCMinutes();
    let _seconds = now.getUTCSeconds();

    if (_hours === 24) {
      _hours = 0;
    }

    _hours = 11 - _hours;
    _minutes = 59 - _minutes;
    _seconds = 59 - _seconds;

    if (_hours < 0) {
      _hours += 24;
    }

    setHours(_hours);
    setMinutes(_minutes);
    setSeconds(_seconds);
  }, [tick]);

  return (
    <div className={Arrays.pack(className, Styles.Clock).join(' ')}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          {/* <span className={Styles.TimeZone}>
            <b.EOD />
            <b.MinusSign />
          </span> */}
          {!!hours && (
            <>
              {hours}
              <abbr title={b.Hours()}>
                <b.HoursAbbr />
              </abbr>
            </>
          )}
          {(!!hours || !!minutes) && (
            <>
              {minutes}
              <abbr title={b.Minutes()}>
                <b.MinutesAbbr />
              </abbr>
            </>
          )}
          <span className={Styles.Seconds}>
            {seconds}
            <abbr title={b.Seconds()}>
              <b.SecondsAbbr />
            </abbr>
          </span>
        </div>
      </div>
    </div>
  );
}
