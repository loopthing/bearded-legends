import DateTimeContent from '@content/DateTime.yaml';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React, { useContext, useEffect, useState } from 'react';
import { HeartbeatContext } from '../../HeartbeatProvider';
import WarTimerContent from '../WarTimer.yaml';
import * as Styles from './UtcClock.scss';

export default function EodClock({ className }) {
  const _logger = new Logger('EodClock');
  const {
    HoursLabel,
    HoursLabelAbbr,
    MinutesLabel,
    MinutesLabelAbbr,
    SecondsLabel,
    SecondsLabelAbbr,
  } = useContentBundle(GlobalContent, DateTimeContent, WarTimerContent);
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
    <div className={DOM.classNames(className, Styles.Clock)}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          {!!hours && (
            <>
              {hours}
              <abbr title={HoursLabel()}>
                <HoursLabelAbbr />
              </abbr>
            </>
          )}
          {(!!hours || !!minutes) && (
            <>
              {minutes}
              <abbr title={MinutesLabel()}>
                <MinutesLabelAbbr />
              </abbr>
            </>
          )}
          <span className={Styles.Seconds}>
            {seconds}
            <abbr title={SecondsLabel()}>
              <SecondsLabelAbbr />
            </abbr>
          </span>
        </div>
      </div>
    </div>
  );
}
