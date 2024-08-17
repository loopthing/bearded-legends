import Button from '@components/Button';
import Card from '@components/Card';
import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
import Toolbar from '@components/Toolbar';
import * as ToolbarStyles from '@components/Toolbar.scss';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import { useLocalStorage } from '@hooks/useStorage';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect, useState } from 'react';
import { Pencil, PlusCircle } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';

import Clock from './Header/Clock';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import * as Styles from './WarTimer.scss';
import useZoom from '../../hooks/useZoom';

const DEFAULT_REMAINING_MILLIS = 1_800_000;

export default function WarTimer({ className }) {
  const _logger = new Logger('WarTimer');
  const b = useContentBundle(content);
  const [tick, start, stop] = useInterval({ delay: 100, strict: true });
  const [timers, setTimers] = useLocalStorage('BL.WarTimer.Data', []);
  const [edit, setEdit] = useState(false);

  useZoom();

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

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  return (
    <>
      <div className={Arrays.pack(className, Styles.GuildWars).join(' ')}>
        <div
          className={Arrays.pack(
            Layout.Flex,
            Layout.JustifyCenter,
            Layout.AlignCenter,
          ).join(' ')}
        >
          <div>
            <div
              className={Arrays.pack(
                Layout.Flex,
                Layout.JustifyCenter,
                Layout.AlignCenter,
                Layout.NoWrap,
              ).join(' ')}
            >
              <Clock className={Styles.Clock} tick={tick} />
            </div>
            <div className={Layout.TextCenter}>
              <b.GuildNameDecorative />
            </div>
          </div>
        </div>

        <ul
          className={Arrays.pack(
            Layout.Flex,
            Layout.JustifyStart,
            Layout.AlignStart,
            Layout.Wrap,
          ).join(' ')}
        >
          {timers.map((timer, index) => (
            <li key={timer.uuid}>
              <Card className={Styles.Card} edit={edit}>
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
                    <b.RemoveButtonLabel />
                  </Button>
                </Card.SlideIn>
              </Card>
            </li>
          ))}
        </ul>

        <NodeDataList />
      </div>

      <Toolbar>
        <Hyperlink
          className={Arrays.pack(HyperlinkStyles.Button).join(' ')}
          href="/"
        >
          <b.HomeButtonLabel />
        </Hyperlink>
        <Button onClick={onClickAddButton}>
          <PlusCircle />
          <div>
            <b.AddButtonLabel />
          </div>
        </Button>
        <Button onClick={onClickEditButton}>
          <Pencil />
          <div>{!edit ? <b.EditButtonLabel /> : <b.DoneButtonLabel />}</div>
        </Button>
      </Toolbar>
    </>
  );
}
