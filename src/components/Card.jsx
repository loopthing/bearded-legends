import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './Card.scss';

export default function Card({ className, children }) {
  return (
    <div className={Arrays.pack(className, Styles.Card).join(' ')}>
      <div>{children}</div>
    </div>
  );
}
