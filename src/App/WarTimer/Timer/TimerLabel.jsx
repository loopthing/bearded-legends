import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Logger from '@utils/Logger';
import React, { useRef } from 'react';
import * as Styles from './TimerLabel.scss';

export default function TimerLabel({ name, setName, dataListId }) {
  const _logger = new Logger('TimerLabel');
  const b = useContentBundle(content);
  const inputRef = useRef(null);

  const onFocus = (_domEvent) => {
    inputRef.current.select();
  };

  const onChange = (domEvent) => {
    const { target } = domEvent;
    const { value } = target;
    setName(value);
  };

  const onKeyUp = (domEvent) => {
    if (domEvent.key === 'Enter') {
      domEvent.target.blur();
    }
  };

  return (
    <div className={Styles.TimerLabel}>
      <input
        ref={inputRef}
        value={name}
        autoCorrect={'false'}
        spellCheck={false}
        list={dataListId}
        placeholder={b.DefaultTimerName()}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
      ></input>
      <div></div>
    </div>
  );
}
