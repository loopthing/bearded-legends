import Button from '@components/Button';
import Card from '@components/Card';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import Logger from '@utils/Logger';
import React, { useContext } from 'react';
import { HeartbeatContext } from '../HeartbeatProvider';
import Timer from './Timer/Timer';
import * as Styles from './TimerList.scss';
import WarTimerContent from './WarTimer.yaml';

export default function TimerList({
  timers,
  editAll,
  updateTimer,
  removeTimer,
}) {
  const _logger = new Logger('WarTimer');
  const { tick } = useContext(HeartbeatContext);

  const { RemoveButtonLabel } = useContent(GlobalContent, WarTimerContent);

  return (
    <ul className={Styles.TimerList}>
      {timers.map((timer, index) => (
        <li key={timer.uuid}>
          <Card className={Styles.Card} edit={editAll}>
            <Timer
              tick={tick}
              timer={timer}
              setTimer={(value) => updateTimer(index, value)}
              nodeDataListId="nodeDataList"
            />
            <Card.SlideIn className={Styles.SlideIn}>
              <Button
                className={Styles.RemoveButton}
                onClick={(_domEvent) => removeTimer(index)}
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
