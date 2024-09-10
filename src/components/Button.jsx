import DOM from '@utils/DOM';
import React, { useEffect, useRef } from 'react';
import * as Styles from './Button.scss';
import * as AnimationStyles from '@styles/Animation.scss';

export default function Button({ className, children, onClick }) {
  const attr = DOM.attr(arguments[0]);

  const animationRef = useRef();

  useEffect(() => {
    const node = animationRef.current;

    const onAnimationEnd = () => {
      node.classList.remove(AnimationStyles.BounceOnFocus);
    };

    const onBlur = () => {
      node.classList.add(AnimationStyles.BounceOnFocus);
    };

    node.addEventListener('animationend', onAnimationEnd);
    node.addEventListener('blur', onBlur);
    node.addEventListener('click', onBlur);

    return () => {
      node.removeEventListener('animationend', onAnimationEnd);
      node.removeEventListener('blur', onBlur);
      node.removeEventListener('click', onBlur);
    };
  }, []);

  return (
    <button
      ref={animationRef}
      className={DOM.classNames(
        className,
        Styles.Button,
        AnimationStyles.BounceOnFocus,
      )}
      type="button"
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
}
