import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Arrays from '@utils/Arrays';
import * as Styles from './Hyperlink.scss';

export default function Hyperlink({ className, children, href }) {
  return /^https:/.test(href) ? (
    <a
      className={Arrays.pack(Styles.Hyperlink, className).join(' ')}
      href={href}
    >
      {children}
    </a>
  ) : (
    <RouterLink
      className={Arrays.pack(Styles.Hyperlink, className).join(' ')}
      to={href}
    >
      {children}
    </RouterLink>
  );
}
