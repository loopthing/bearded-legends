import Button from '@components/Button';
import Toolbar from '@components/Toolbar';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import { useLocalStorage } from '@hooks/useStorage';
import Clipboard from '@utils/Clipboard';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React from 'react';
import { Copy } from 'react-bootstrap-icons';
import Navigation from '../Navigation/Navigation';
import TimerDisplay from '../TimerDisplay';
import * as Styles from './Timestamp.scss';
import TimestampContent from './Timestamp.yaml';

export default function Timestamp({ className }) {
  const _logger = new Logger('Timestamp');

  const {
    TimestampScreenName,
    TimestampScreenInstructionMessage,
    RelativeTimestampHeader,
    RelativeTimestampMessage,
    RelativeTimestampCopyButtonLabel,
    WallClockTimestampHeader,
    WallClockTimestampMessage,
    WallClockTimestampCopyButtonLabel,
  } = useContentBundle(GlobalContent, TimestampContent);

  const [remainingMillis, setRemainingMillis] = useLocalStorage(
    'BL.Timestamp.remainingMillis',
  );

  const [wallClockDate, setWallClockDate] = useLocalStorage(
    'BL.Timestamp.wallClockDate',
    () => new Date().toISOString().split('T')[0],
  );

  const [wallClockTime, setWallClockTime] = useLocalStorage(
    'BL.Timestamp.wallClockTime',
    () =>
      new Date()
        .toISOString()
        .split('T')[1]
        .replace(/:[^:]+$/, ''),
  );

  const onClickCopyRelativeTimestampButton = async (_domEvent) => {
    const endTimestamp = Date.now() + remainingMillis;
    const timestamp = (endTimestamp / 1000) | 0;
    const text = `<t:${timestamp}:f> (<t:${timestamp}:R>)`; //TODO Make this dynamic and content driven

    try {
      await Clipboard.copy(text);
    } catch (cause) {
      _logger.error('Failed to copy relative timestamp text', cause);
    }
  };

  const onChangeWallClockDate = (domEvent) => {
    setWallClockDate(domEvent.target.value);
  };

  const onChangeWallClockTime = (domEvent) => {
    setWallClockTime(domEvent.target.value);
  };

  const onClickCopyWallClockTimestampButton = async (_domEvent) => {
    const endTimestamp = new Date(
      `${wallClockDate}T${wallClockTime}`,
    ).valueOf();
    const timestamp = (endTimestamp / 1000) | 0;
    const text = `<t:${timestamp}:f> (<t:${timestamp}:R>)`; //TODO Make this dynamic and content driven

    try {
      await Clipboard.copy(text);
    } catch (cause) {
      _logger.error('Failed to copy wall clock timestamp text', cause);
    }
  };

  return (
    <>
      <div className={DOM.classNames(className, Styles.Timestamp)}>
        <h1 tabIndex="-1">
          <TimestampScreenName />
        </h1>
        <p>
          <TimestampScreenInstructionMessage />
        </p>
        <h2>
          <RelativeTimestampHeader />
        </h2>
        <p>
          <RelativeTimestampMessage />
        </p>
        <div className={Styles.RelativeTimestamp}>
          <TimerDisplay
            showHours={true}
            showSeconds={false}
            remainingMillis={remainingMillis}
            updateRemainingMillis={setRemainingMillis}
          />
          <Button onClick={onClickCopyRelativeTimestampButton}>
            <Copy />
            <span>
              <RelativeTimestampCopyButtonLabel />
            </span>
          </Button>
        </div>
        <h2>
          <WallClockTimestampHeader />
        </h2>
        <p>
          <WallClockTimestampMessage />
        </p>
        <div className={Styles.WallClockTimestamp}>
          <label>
            Date
            <input
              type="date"
              value={wallClockDate}
              onChange={onChangeWallClockDate}
            ></input>
          </label>
          <label>
            Time
            <input
              type="time"
              value={wallClockTime}
              onChange={onChangeWallClockTime}
            ></input>
          </label>
          <Button onClick={onClickCopyWallClockTimestampButton}>
            <Copy />
            <span>
              <WallClockTimestampCopyButtonLabel />
            </span>
          </Button>
        </div>
      </div>
      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
