import ShowAnimation from '@components/ShowAnimation';
import IconButton from '@components/IconButton';
import SrOnly from '@components/SrOnly';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect, useState } from 'react';
import {
  BoxArrowUp,
  Copy,
  PauseCircle,
  PlayCircle,
  XCircle,
} from 'react-bootstrap-icons';

import * as Styles from './Timer.scss';
import TimerDisplay from './TimerDisplay';
import TimerLabel from './TimerLabel';

const DEFAULT_REMAINING_MILLIS = 1_800_000; //FIXME Repeated definition
const WARNING_REMAINING_MILLIS = 240_000;

export default function Timer({
  className,
  nodeDataListId,
  tick,
  timer,
  setTimer,
}) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(content);

  const { name, startTimestamp, pauseTimestamp, endTimestamp } = timer;

  const [remainingMillis, setRemainingMillis] = useState(
    endTimestamp - startTimestamp,
  );

  const setName = (name) => {
    setTimer({ ...timer, name });
  };

  const updateRemainingMillis = (newRemainingMillis) => {
    const now = Date.now();

    if (pauseTimestamp) {
      setTimer({
        ...timer,
        pauseTimestamp: now,
        endTimestamp: now + newRemainingMillis,
      });
    } else if (startTimestamp) {
      setTimer({
        ...timer,
        startTimestamp: now,
        endTimestamp: now + newRemainingMillis,
      });
    } else {
      setTimer({
        ...timer,
        endTimestamp: startTimestamp + newRemainingMillis,
      });
    }

    setRemainingMillis(newRemainingMillis);
  };

  const onClickStartButton = (_domEvent) => {
    const now = Date.now();

    setTimer({
      ...timer,
      startTimestamp: now,
      endTimestamp: now + remainingMillis,
    });
  };

  const onClickPauseButton = (_domEvent) => {
    setTimer({ ...timer, pauseTimestamp: Date.now() });
  };

  const onClickResumeButton = (_domEvent) => {
    const now = Date.now();

    setTimer({
      ...timer,
      startTimestamp: now,
      pauseTimestamp: 0,
      endTimestamp: now + remainingMillis,
    });
  };

  const onClickResetButton = (_domEvent) => {
    setRemainingMillis(DEFAULT_REMAINING_MILLIS);

    setTimer({
      ...timer,
      startTimestamp: 0,
      pauseTimestamp: 0,
      endTimestamp: DEFAULT_REMAINING_MILLIS,
    });
  };

  const onClickCopyButton = (_domEvent) => {
    const timestamp = (endTimestamp / 1000) | 0;
    const text =
      remainingMillis > 0
        ? b.EndsAtMessage({ timerName: name, timestamp })
        : b.ExpiredAtMessage({ timerName: name, timestamp });

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).catch((cause) => {
        _logger.error('Failed to copy timer', cause);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
      } catch (cause) {
        console.error('Failed to copy timer', cause);
      }

      document.body.removeChild(textarea);
    }
  };

  // Restore all timers on render
  useEffect(() => {
    if (pauseTimestamp) {
      setRemainingMillis(endTimestamp - pauseTimestamp);
    } else {
      setRemainingMillis(endTimestamp - startTimestamp);
    }
  }, []);

  // If the timer is active, update on every tick
  useEffect(() => {
    if (startTimestamp && !pauseTimestamp) {
      setRemainingMillis(endTimestamp - Date.now());
    }
  }, [tick]);

  return (
    <div className={Arrays.pack(className, Styles.Timer).join(' ')}>
      <div
        className={Arrays.pack(
          pauseTimestamp && Styles.Paused,
          startTimestamp && Styles.Started,
          !startTimestamp && Styles.Paused,
          remainingMillis < WARNING_REMAINING_MILLIS && Styles.Warning,
          remainingMillis < 0 && Styles.Expired,
        ).join(' ')}
      >
        <TimerLabel
          className={Styles.TimerLabel}
          dataListId={nodeDataListId}
          name={name}
          setName={setName}
        />

        <div className={Styles.TimerContent}>
          <div className={Styles.TimerDisplay}>
            {remainingMillis < 0 ? (
              <IconButton onClick={onClickResetButton}>
                <XCircle />
                <SrOnly>
                  <b.ResetButtonLabel />
                </SrOnly>
              </IconButton>
            ) : pauseTimestamp ? (
              <IconButton onClick={onClickResumeButton}>
                <PlayCircle />
                <SrOnly>
                  <b.ResumeButtonLabel />
                </SrOnly>
              </IconButton>
            ) : !startTimestamp ? (
              <IconButton onClick={onClickStartButton}>
                <PlayCircle />
                <SrOnly>
                  <b.StartButtonLabel />
                </SrOnly>
              </IconButton>
            ) : (
              <IconButton onClick={onClickPauseButton}>
                <PauseCircle />
                <SrOnly>
                  <b.PauseButtonLabel />
                </SrOnly>
              </IconButton>
            )}

            <ShowAnimation
              trigger={remainingMillis > 0 && !!pauseTimestamp}
              expand={Styles.Expand}
              collapse={Styles.Collapse}
            >
              <IconButton onClick={onClickResetButton}>
                <XCircle />
                <SrOnly>
                  <b.ResetButtonLabel />
                </SrOnly>
              </IconButton>
            </ShowAnimation>

            <ShowAnimation
              trigger={!!startTimestamp && !pauseTimestamp}
              expand={Styles.Expand}
              collapse={Styles.Collapse}
            >
              <IconButton onClick={onClickCopyButton}>
                <BoxArrowUp />
                <SrOnly>
                  <b.CopyButtonLabel />
                </SrOnly>
              </IconButton>
            </ShowAnimation>

            <TimerDisplay
              remainingMillis={remainingMillis}
              updateRemainingMillis={updateRemainingMillis}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
