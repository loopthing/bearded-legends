import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DOM from '@utils/DOM';
import * as Styles from './Hyperlink.scss';

export default function Hyperlink({ className, children, href, onClick }) {
  return /^https:/.test(href) ? (
    <a
      className={DOM.classNames(Styles.Hyperlink, className)}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <RouterLink
      className={DOM.classNames(Styles.Hyperlink, className)}
      to={href}
      onClick={onClick}
    >
      {children}
    </RouterLink>
  );
}
