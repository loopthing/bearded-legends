import { SrOnly } from '@components/SrOnly';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useEffect, useState } from 'react';
import { ArrowClockwise, PauseCircle, PlayCircle } from 'react-bootstrap-icons';
import useInterval from '../../../hooks/useInterval';
import appContent from '../../App.yaml';
import * as Styles from './Timer.scss';
import content from './Timer.yaml';
import TimerControl from './TimerControl';
import TimerDisplay from './TimerDisplay';
import TimerLabel from './TimerLabel';

const DEFAULT_REMAINING_MILLIS = 1_800_000;
const WARNING_REMAINING_MILLIS = 240_000;
const EXPIRING_REMAINING_MILLIS = 120_000;

// FIXME auto generate ID if one is not provided

export default function Timer({ className, nodeDataListId, timer, setTimer }) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(appContent, content);
  const [tick, start, stop] = useInterval({ strict: false });
  const [{ hours, minutes, seconds }, setDisplay] = useState({});

  const [remainingMillis, setRemainingMillis] = useState(
    DEFAULT_REMAINING_MILLIS,
  );

  const { name, startTimestamp, pauseTimestamp } = timer;

  const setName = (name) => {
    setTimer({
      ...timer,
      name,
    });
  };

  const onClickStartButton = (_domEvent) => {
    onClickResetButton();
    start();

    setTimer({
      ...timer,
      startTimestamp: Date.now(),
    });
  };

  const onClickPauseButton = (_domEvent) => {
    if (!pauseTimestamp) {
      stop();
      setTimer({ ...timer, pauseTimestamp: Date.now() });
    }
  };

  const onClickResumeButton = (_domEvent) => {
    if (pauseTimestamp) {
      const _startTimestamp = startTimestamp + Date.now() - pauseTimestamp;

      setTimer({
        ...timer,
        startTimestamp: _startTimestamp,
        pauseTimestamp: 0,
      });

      start();

      setTimer({
        ...timer,
        startTimestamp: _startTimestamp,
        pauseTimestamp: 0,
      });
    }
  };

  const onClickResetButton = (_domEvent) => {
    stop();
    setTimer({ ...timer, startTimestamp: 0, pauseTimestamp: 0 });
    setRemainingMillis(DEFAULT_REMAINING_MILLIS);
  };

  const onClickSuperButton = (_domEvent) => {
    if (!startTimestamp) {
      onClickStartButton(_domEvent);
    } else if (startTimestamp && pauseTimestamp) {
      onClickResumeButton(_domEvent);
    } else if (!pauseTimestamp) {
      onClickPauseButton(_domEvent);
    }
  };

  useEffect(() => {
    if (pauseTimestamp) {
      // Had the timer been paused prior to browser refresh, we should adjust
      // the paused timing so that the start/pause timestamps are relevant.
      const now = Date.now();
      const elapsed = now - pauseTimestamp;

      setTimer({
        ...timer,
        startTimestamp: startTimestamp + elapsed,
        pauseTimestamp: now,
      });
    } else if (startTimestamp) {
      // Had the timer been running when browser was refreshed, we should
      // pick up where we originally left off.
      start();
    }
  }, []);

  useEffect(() => {
    if (startTimestamp) {
      const now = pauseTimestamp || Date.now();
      const elapsedMillis = now - startTimestamp;
      setRemainingMillis(DEFAULT_REMAINING_MILLIS - elapsedMillis);
    }
  }, [tick, startTimestamp, pauseTimestamp]);

  useEffect(() => {
    const remainingSeconds = remainingMillis / 1000;
    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;

    const seconds = remainingSeconds % 60;
    const minutes = remainingMinutes % 60;
    const hours = remainingHours;

    if (remainingMillis > 0) {
      setDisplay({
        hours: Math.abs(Math.floor(hours)),
        minutes: Math.abs(Math.floor(minutes)),
        seconds: Math.abs(Math.floor(seconds)),
      });
    } else {
      setDisplay({
        hours: Math.abs(Math.ceil(hours)),
        minutes: Math.abs(Math.ceil(minutes)),
        seconds: Math.abs(Math.ceil(seconds)),
      });
    }
  }, [remainingMillis]);

  return (
    <div className={Arrays.pack(className, Styles.Timer).join(' ')}>
      <div
        className={Arrays.pack(
          pauseTimestamp && Styles.Paused,
          startTimestamp && Styles.Started,
          !startTimestamp && Styles.Paused,
          remainingMillis < WARNING_REMAINING_MILLIS && Styles.Warning,
          remainingMillis < EXPIRING_REMAINING_MILLIS && Styles.Expiring,
          remainingMillis < 0 && Styles.Expired,
        ).join(' ')}
      >
        <TimerLabel
          className={Styles.Label}
          name={name}
          dataListId={nodeDataListId}
          setName={setName}
        />

        <div
          className={Arrays.pack(
            Layout.Flex,
            Layout.JustifySpaceBetween,
            Layout.AlignCenter,
          ).join(' ')}
        >
          <div
            className={Arrays.pack(
              Layout.Flex,
              Layout.JustifyStart,
              Layout.AlignCenter,
              Layout.NoWrap,
            ).join(' ')}
          >
            <TimerControl onClick={onClickSuperButton}>
              {pauseTimestamp ? (
                <>
                  <PlayCircle />
                  <SrOnly>
                    <b.ResumeButtonLabel />
                  </SrOnly>
                </>
              ) : !startTimestamp ? (
                <>
                  <PlayCircle />
                  <SrOnly>
                    <b.StartButtonLabel />
                  </SrOnly>
                </>
              ) : (
                <>
                  <PauseCircle />
                  <SrOnly>
                    <b.PauseButtonLabel />
                  </SrOnly>
                </>
              )}
            </TimerControl>

            <TimerDisplay
              className={Styles.Display}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />

            {!!pauseTimestamp && (
              <TimerControl onClick={onClickResetButton}>
                <ArrowClockwise />
                <SrOnly>
                  <b.ResetButtonLabel />
                </SrOnly>
              </TimerControl>
            )}
          </div>

          {/* <div
            className={Arrays.pack(
              Styles.SlideIn,
              swipe === 'left' && Styles.Open,
            ).join(' ')}
          >
            <button
              type="button"
              onClick={(domEvent) => {
                onClickResetButton(domEvent);
                resetSwipe();
              }}
            >
              <div
                className={Arrays.pack(
                  Layout.Flex,
                  Layout.JustifyStart,
                  Layout.AlignCenter,
                ).join(' ')}
              >
                <b.RemoveButtonLabel />
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
