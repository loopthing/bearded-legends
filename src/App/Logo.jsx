import DOM from '@utils/DOM';
import React from 'react';
import * as Styles from './Logo.scss';

export default function Logo({ className }) {
  return <div className={DOM.classNames(className, Styles.Logo)}></div>;
}
