import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './Toolbar.scss';

export default function Toolbar({ className, children }) {
  return (
    <div className={Arrays.pack(className, Styles.Toolbar).join(' ')}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className: child.props.className,
        }),
      )}
    </div>
  );
}
