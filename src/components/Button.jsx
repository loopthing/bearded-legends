import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './Button.scss';
import DOM from '@utils/DOM';

export default function Button({ className, children, onClick }) {
  const aria = DOM.attr.getAria(arguments[0]);

  return (
    <button
      className={Arrays.pack(className, Styles.Button).join(' ')}
      type="button"
      onClick={onClick}
      {...aria}
    >
      {children}
    </button>
  );
}
