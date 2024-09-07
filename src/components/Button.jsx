import DOM from '@utils/DOM';
import React from 'react';
import * as Styles from './Button.scss';

export default function Button({ className, children, onClick }) {
  const attr = DOM.attr(arguments[0]);

  return (
    <button
      className={DOM.classNames(className, Styles.Button)}
      type="button"
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
}
