import Button from '@components/Button';
import SrOnly from '@components/SrOnly';
import Toolbar from '@components/Toolbar';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
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

  const {
    WarTimerScreenName,
    AddButtonLabel,
    DoneButtonLabel,
    EditButtonLabel,
  } = useContentBundle(GlobalContent, WarTimerContent);

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
      <SrOnly>
        <h1 tabIndex="-1">
          <WarTimerScreenName />
        </h1>
      </SrOnly>

      <div className={DOM.classNames(className, Styles.WarTimer)}>
        <WarTimerHeader />
        <TimerList timers={timers} setTimers={setTimers} edit={edit} />
        <NodeDataList />
      </div>

      <Toolbar>
        <Navigation />

        <Button onClick={onClickAddButton}>
          <PlusCircle />
          <span>
            <AddButtonLabel />
          </span>
        </Button>

        <Button onClick={onClickEditButton}>
          <Pencil />
          {!edit ? (
            <span>
              <EditButtonLabel />
            </span>
          ) : (
            <span>
              <DoneButtonLabel />
            </span>
          )}
        </Button>
      </Toolbar>
    </>
  );
}
