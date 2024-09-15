import Button from '@components/Button';
import SrOnly from '@components/SrOnly';
import Toolbar from '@components/Toolbar';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import { useLocalStorage } from '@hooks/useStorage';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React, { useState } from 'react';
import { Pencil, PlusCircle } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';
import Navigation from '../Navigation/Navigation';
import NodeDataList from './NodeDataList';
import TimerList from './TimerList';
import * as Styles from './WarTimer.scss';
import WarTimerContent from './WarTimer.yaml';
import WarTimerHeader from './WarTimerHeader/WarTimerHeader';

const DEFAULT_REMAINING_MILLIS = 1_800_000;

export default function WarTimer({ className }) {
  const _logger = new Logger('WarTimer');
  const [timers, setTimers] = useLocalStorage('BL.WarTimer.data', []);
  const [editAll, setEditAll] = useState(false);

  const {
    WarTimerScreenHeader,
    AddButtonLabel,
    DoneButtonLabel,
    EditButtonLabel,
  } = useContent(GlobalContent, WarTimerContent);

  const addTimer = (value) => {
    // Add a new timer at the end of the list.
    setTimers([...timers, value]);
  };

  const updateTimer = (index, value) => {
    // Replace the timer value that was updated by the caller.
    setTimers(timers.map((e, i) => (i === index ? { ...value } : e)));
  };

  const removeTimer = (index) => {
    // Delete the timer that was removed by the caller.
    setTimers([...timers.slice(0, index), ...timers.slice(index + 1)]);
  };

  const onClickAddButton = (_domEvent) => {
    addTimer({
      uuid: uuidv4(),
      name: '',
      startTimestamp: 0,
      pauseTimestamp: 0,
      endTimestamp: DEFAULT_REMAINING_MILLIS,
    });
  };

  const onClickEditAllButton = (_domEvent) => {
    setEditAll((x) => !x);
  };

  return (
    <>
      <SrOnly>
        <h1 tabIndex="-1">{WarTimerScreenHeader()}</h1>
      </SrOnly>

      <div className={DOM.classNames(className, Styles.WarTimer)}>
        <WarTimerHeader />
        <TimerList
          timers={timers}
          editAll={editAll}
          updateTimer={updateTimer}
          removeTimer={removeTimer}
        />
        <NodeDataList />
      </div>

      <Toolbar>
        <Navigation />

        <Button onClick={onClickAddButton}>
          <PlusCircle />
          <span>{AddButtonLabel()}</span>
        </Button>

        <Button onClick={onClickEditAllButton}>
          <Pencil />
          {!editAll ? (
            <span>{EditButtonLabel()}</span>
          ) : (
            <span>{DoneButtonLabel()}</span>
          )}
        </Button>
      </Toolbar>
    </>
  );
}
