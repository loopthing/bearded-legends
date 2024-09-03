import Button from '@components/Button';
import Hyperlink from '@components/Hyperlink';
import React, { useState } from 'react';
import { Clock, Gear, House, List } from 'react-bootstrap-icons';
import * as Styles from './Navigation.scss';

export default function Navigation() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((x) => !x);

  const hideMenu = () => setIsOpen(false);

  return (
    <nav>
      <Button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="menu"
        aria-label="Toggle menu"
      >
        <List />
      </Button>

      <ul
        className={`${Styles.Menu} ${isOpen ? Styles.Open : ''}`}
        role="menubar"
        aria-label="Navigation menu"
      >
        <li role="none">
          <Hyperlink role="menuitem" href={'/'} onClick={hideMenu}>
            <House />
            <span>Home</span>
          </Hyperlink>
        </li>
        <li role="none">
          <Hyperlink role="menuitem" href={'/war-timer'} onClick={hideMenu}>
            <Clock />
            <span>War timer</span>
          </Hyperlink>
        </li>
        <li role="none">
          <Hyperlink role="menuitem" href={'/settings'} onClick={hideMenu}>
            <Gear />
            <span>Settings</span>
          </Hyperlink>
        </li>
      </ul>
    </nav>
  );
}
