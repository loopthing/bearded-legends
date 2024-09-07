import DOM from '@utils/DOM';
import React from 'react';
import * as Styles from './Toolbar.scss';

export default function Toolbar({ className, children }) {
  return (
    <div className={DOM.classNames(className, Styles.Toolbar)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className: child.props.className,
        }),
      )}
    </div>
  );
}
