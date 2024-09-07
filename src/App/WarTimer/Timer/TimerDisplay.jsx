import SrOnly from '@components/SrOnly';
import dateTimeContent from '@content/DateTime.yaml';
import globalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React, { useEffect, useRef, useState } from 'react';
import warTimerContent from '../WarTimer.yaml';
import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({
  className,
  remainingMillis,
  updateRemainingMillis,
}) {
  const _logger = new Logger('TimerDisplay');
  const {
    HoursLabel,
    HoursLabelAbbr,
    MinutesLabel,
    MinutesLabelAbbr,
    SecondsLabel,
    SecondsLabelAbbr,
  } = useContentBundle(globalContent, dateTimeContent, warTimerContent);
  const ref = useRef(null);
  const dirtyRef = useRef({});

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [hoursBuffer, setHoursBuffer] = useState('');
  const [minutesBuffer, setMinutesBuffer] = useState('');
  const [secondsBuffer, setSecondsBuffer] = useState('');

  useEffect(() => {
    const _remainingMillis = Math.abs(remainingMillis);

    const remainingSeconds =
      remainingMillis > 0
        ? Math.ceil(_remainingMillis / 1000)
        : Math.floor(_remainingMillis / 1000);

    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;

    setSeconds(Math.floor(remainingSeconds) % 60);
    setMinutes(Math.floor(remainingMinutes) % 60);
    setHours(Math.floor(remainingHours));
  }, [remainingMillis]);

  const onFocus = (domEvent) => {
    const { target } = domEvent;

    setHoursBuffer(hours);
    setMinutesBuffer(minutes);
    setSecondsBuffer(seconds);

    setTimeout(() => {
      target.selectionStart = target.selectionEnd = target.value.length;
    }, 0);
  };

  const onChange = (domEvent) => {
    const { target } = domEvent;
    const { value } = target;
    const el = target.closest('[class]');

    if (el.classList.contains(Styles.Hours)) {
      setHoursBuffer(value);
      dirtyRef.current.hours = true;
    } else if (el.classList.contains(Styles.Minutes)) {
      setMinutesBuffer(value);
      dirtyRef.current.minutes = true;
    } else if (el.classList.contains(Styles.Seconds)) {
      setSecondsBuffer(value);
      dirtyRef.current.seconds = true;
    }
  };

  const onKeyUp = (domEvent) => {
    if (domEvent.key === 'Enter') {
      domEvent.target.blur();
    }
  };

  const onBlur = (domEvent) => {
    domEvent.target.blur();
    onChange(domEvent);

    updateRemainingMillis(
      Number(dirtyRef.current.hours ? hoursBuffer : hours) * 3_600_000 +
        Number(dirtyRef.current.minutes ? minutesBuffer : minutes) * 60_000 +
        Number(dirtyRef.current.seconds ? secondsBuffer : seconds) * 1_000,
    );

    dirtyRef.current = {};
  };

  return (
    <div
      ref={ref}
      className={DOM.classNames(
        className,
        Styles.TimerDisplay,
        Layout.FlexRow,
        Layout.JustifyStart,
        Layout.AlignBaseline,
      )}
    >
      {!!hours && (
        <>
          <div className={Styles.Hours}>
            {hours}
            <label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={String(hours).length}
                pattern="[0-9]*"
                value={hoursBuffer}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
              />
              <SrOnly>
                <HoursLabel />
              </SrOnly>
            </label>
          </div>

          <abbr title={HoursLabel()}>
            <HoursLabelAbbr />
          </abbr>
        </>
      )}

      <div className={Styles.Minutes}>
        {hours
          ? String(minutes || 0).padStart(2, '0')
          : String(minutes || 0).padStart(2, '0')}

        <label>
          <input
            type="text"
            inputMode="numeric"
            maxLength="2"
            pattern="[0-9]*"
            value={minutesBuffer}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmit={onBlur}
            onKeyUp={onKeyUp}
          />

          <SrOnly>
            <MinutesLabel />
          </SrOnly>
        </label>
      </div>

      <abbr title={MinutesLabel()}>
        <MinutesLabelAbbr />
      </abbr>

      <div className={Styles.Seconds}>
        {String(seconds || 0).padStart(2, '0')}

        <label>
          <input
            type="text"
            inputMode="numeric"
            maxLength="2"
            pattern="[0-9]*"
            value={secondsBuffer}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmit={onBlur}
            onKeyUp={onKeyUp}
          />

          <SrOnly>
            <SecondsLabel />
          </SrOnly>
        </label>
      </div>

      <abbr title={SecondsLabel()}>
        <SecondsLabelAbbr />
      </abbr>
    </div>
  );
}
