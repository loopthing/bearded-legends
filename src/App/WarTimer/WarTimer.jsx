import Button from '@components/Button';
import Toolbar from '@components/Toolbar';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import { useLocalStorage } from '@hooks/useStorage';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useState } from 'react';
import { Pencil, PlusCircle } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';

import Navigation from '../Navigation/Navigation';
import NodeDataList from './NodeDataList';
import TimerList from './TimerList';
import * as Styles from './WarTimer.scss';
import WarTimerHeader from './WarTimerHeader/WarTimerHeader';

const DEFAULT_REMAINING_MILLIS = 1_800_000;

export default function WarTimer({ className }) {
  const _logger = new Logger('WarTimer');
  const b = useContentBundle(content);
  const [timers, setTimers] = useLocalStorage('BL.WarTimer.data', []);
  const [edit, setEdit] = useState(false);

  const onClickAddButton = (_domEvent) => {
    const _timers = timers.map((timer) => ({ ...timer }));

    _timers.push({
      uuid: uuidv4(),
      name: '',
      startTimestamp: 0,
      pauseTimestamp: 0,
      endTimestamp: DEFAULT_REMAINING_MILLIS,
    });

    setTimers(_timers);
  };

  const onClickEditButton = (_domEvent) => {
    setEdit((x) => !x);
  };

  return (
    <>
      <div className={Arrays.pack(className, Styles.WarTimer).join(' ')}>
        <WarTimerHeader />
        <TimerList timers={timers} setTimers={setTimers} edit={edit} />
        <NodeDataList />
      </div>

      <Toolbar>
        <Navigation />
        <Button onClick={onClickAddButton}>
          <PlusCircle />
          <span>
            <b.AddButtonLabel />
          </span>
        </Button>
        <Button onClick={onClickEditButton}>
          <Pencil />
          {!edit ? (
            <span>
              <b.EditButtonLabel />
            </span>
          ) : (
            <span>
              <b.DoneButtonLabel />
            </span>
          )}
        </Button>
      </Toolbar>
    </>
  );
}
