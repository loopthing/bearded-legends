import Card from '@components/Card';
import IconButton from '@components/IconButton';
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
import TimerDisplay from '../WarTimer/Timer/TimerDisplay';
import * as Styles from './Timestamp.scss';
import TimestampContent from './Timestamp.yaml';

export default function Timestamp({ className }) {
  const _logger = new Logger('Timestamp');
  const {
    TimestampScreenName,
    TimestampScreenInstructionMessage,
    RelativeTimestampHeader,
    WallClockTimestampHeader,
  } = useContentBundle(GlobalContent, TimestampContent);
  const [remainingMillis, setRemainingMillis] = useLocalStorage(
    'BL.Timestamp.remainingMillis',
  );

  const onClickCopyButton = async (_domEvent) => {
    const endTimestamp = Date.now() + remainingMillis;
    const timestamp = (endTimestamp / 1000) | 0;
    const text = `<t:${timestamp}:f> (<t:${timestamp}:R>)`; //TODO Make this dynamic and content driven

    try {
      await Clipboard.copy(text);
    } catch (cause) {
      _logger.error('Failed to copy timestamp text', cause);
    }
  };

  return (
    <>
      <div className={DOM.classNames(className, Styles.Timestamp)}>
        <h1>
          <TimestampScreenName />
        </h1>
        <p>
          <TimestampScreenInstructionMessage />
        </p>
        <Card className={DOM.classNames(Styles.Card)}>
          <h2>
            <RelativeTimestampHeader />
          </h2>
          <div>
            <IconButton onClick={onClickCopyButton}>
              <Copy />
            </IconButton>
            <TimerDisplay
              showHours={true}
              remainingMillis={remainingMillis}
              updateRemainingMillis={setRemainingMillis}
            />
          </div>
        </Card>
        <Card>
          <h2>
            <WallClockTimestampHeader />
          </h2>
          <div>Today | Tomorrow | Other</div>
          <div>Calendar date</div>
          <div>HH:MM</div>
        </Card>
      </div>
      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
