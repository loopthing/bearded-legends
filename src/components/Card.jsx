import useSwipe from '@hooks/useSwipe';
import * as AnimationStyles from '@styles/Animation.scss';
import * as Layout from '@styles/Layout.scss';
import DOM from '@utils/DOM';
import React, { useEffect, useState } from 'react';
import * as Styles from './Card.scss';

export default function Card({ className, children, edit: _edit }) {
  const [swipeRef, swipe] = useSwipe();
  const [edit, setEdit] = useState(_edit); // FIXME The overall state vs. individual state

  const frontChildren = React.Children.toArray(children).filter(
    (child) => child.type !== SlideIn,
  );

  const slideInChildren = React.Children.toArray(children).filter(
    (child) => child.type === SlideIn,
  );

  useEffect(() => {
    setEdit(swipe === 'left');
  }, [swipe]);

  useEffect(() => {
    setEdit(_edit);
  }, [_edit]);

  return (
    <div
      tabIndex="-1"
      className={DOM.classNames(
        className,
        Styles.Card,
        edit && AnimationStyles.Shimmer,
        // edit && Styles.Flip, // FIXME Move animation to AnimationStyles
      )}
      ref={swipeRef}
    >
      <div
        className={DOM.classNames(
          Styles.Content,
          Layout.FlexRow,
          Layout.JustifySpaceBetween,
          Layout.AlignStart,
        )}
      >
        <div className={DOM.classNames(Styles.Front, edit && Styles.Collapse)}>
          {frontChildren}
        </div>

        <div
          className={DOM.classNames(
            Styles.SlideIn,
            Layout.FlexRow,
            Layout.JustifyEnd,
            edit && Styles.Open,
          )}
        >
          {slideInChildren}
        </div>
      </div>
    </div>
  );
}

Card.SlideIn = SlideIn;

function SlideIn({ className, children }) {
  return <div className={DOM.classNames(className)}>{children}</div>;
}
