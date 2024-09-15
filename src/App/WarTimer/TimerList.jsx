import Button from '@components/Button';
import Card from '@components/Card';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Logger from '@utils/Logger';
import React, { useContext } from 'react';
import { HeartbeatContext } from '../HeartbeatProvider';
import Timer from './Timer/Timer';
import * as Styles from './TimerList.scss';
import WarTimerContent from './WarTimer.yaml';

export default function TimerList({ timers, editAll, setTimers }) {
  const _logger = new Logger('WarTimer');
  const { RemoveButtonLabel } = useContentBundle(
    GlobalContent,
    WarTimerContent,
  );
  const { tick } = useContext(HeartbeatContext);

  return (
    <ul className={Styles.TimerList}>
      {timers.map((timer, index) => (
        <li key={timer.uuid}>
          <Card className={Styles.Card} edit={editAll}>
            <Timer
              tick={tick}
              timer={timer}
              setTimer={(value) =>
                // Replace the timer value that was updated by the caller.
                setTimers(
                  timers.map((e, i) => (i === index ? { ...value } : e)),
                )
              }
              nodeDataListId="nodeDataList"
            />
            <Card.SlideIn className={Styles.SlideIn}>
              <Button
                className={Styles.RemoveButton}
                onClick={(_domEvent) => {
                  // Delete the timer that was removed by the caller.
                  setTimers([
                    ...timers.slice(0, index),
                    ...timers.slice(index + 1),
                  ]);
                }}
              >
                <RemoveButtonLabel />
              </Button>
            </Card.SlideIn>
          </Card>
        </li>
      ))}
    </ul>
  );
}
