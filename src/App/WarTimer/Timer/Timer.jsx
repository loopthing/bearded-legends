import IconButton from '@components/IconButton';
import ShowAnimation from '@components/ShowAnimation';
import SrOnly from '@components/SrOnly';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import Clipboard from '@utils/Clipboard';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React, { useEffect, useState } from 'react';
import { Copy, PauseCircle, PlayCircle, XCircle } from 'react-bootstrap-icons';
import * as Styles from './Timer.scss';
import TimerDisplay from '../../TimerDisplay';
import TimerLabel from './TimerLabel';
import WarTimerContent from '../WarTimer.yaml';

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
  const {
    CopyButtonLabel,
    PauseButtonLabel,
    ResetButtonLabel,
    ResumeButtonLabel,
    StartButtonLabel,
    DefaultTimerName,
    EndsAtMessage,
    ExpiredAtMessage,
  } = useContent(GlobalContent, WarTimerContent);

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

  const onClickCopyButton = async (_domEvent) => {
    const timestamp = (endTimestamp / 1000) | 0;
    const timerName = name || DefaultTimerName();
    const text =
      remainingMillis > 0
        ? EndsAtMessage({ timerName, timestamp })
        : ExpiredAtMessage({ timerName, timestamp });

    try {
      await Clipboard.copy(text);
    } catch (cause) {
      _logger.error('Failed to copy timer text', cause);
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
    <div className={DOM.classNames(className, Styles.Timer)}>
      <div
        className={DOM.classNames(
          pauseTimestamp && Styles.Paused,
          startTimestamp && Styles.Started,
          !startTimestamp && Styles.Paused,
          remainingMillis < WARNING_REMAINING_MILLIS && Styles.Warning,
          remainingMillis < 0 && Styles.Expired,
        )}
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
                  <ResetButtonLabel />
                </SrOnly>
              </IconButton>
            ) : pauseTimestamp ? (
              <IconButton onClick={onClickResumeButton}>
                <PlayCircle />
                <SrOnly>
                  <ResumeButtonLabel />
                </SrOnly>
              </IconButton>
            ) : !startTimestamp ? (
              <IconButton onClick={onClickStartButton}>
                <PlayCircle />
                <SrOnly>
                  <StartButtonLabel />
                </SrOnly>
              </IconButton>
            ) : (
              <IconButton onClick={onClickPauseButton}>
                <PauseCircle />
                <SrOnly>
                  <PauseButtonLabel />
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
                  <ResetButtonLabel />
                </SrOnly>
              </IconButton>
            </ShowAnimation>

            <ShowAnimation
              trigger={!!startTimestamp && !pauseTimestamp}
              expand={Styles.Expand}
              collapse={Styles.Collapse}
            >
              <IconButton onClick={onClickCopyButton}>
                <Copy />
                <SrOnly>
                  <CopyButtonLabel />
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
