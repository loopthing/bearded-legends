import Button from '@components/Button';
import Hyperlink from '@components/Hyperlink';
import GlobalContent from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import React, { useEffect, useState } from 'react';
import { Clock, Gear, House, List } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';
import * as Styles from './Navigation.scss';
import NavigationContent from './Navigation.yaml';

export default function Navigation({ onClick }) {
  const [menuId, setMenuId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleMenu = () => setIsExpanded((x) => !x);
  const hideMenu = () => setIsExpanded(false);
  const b = useContentBundle(GlobalContent, NavigationContent);

  useEffect(() => setMenuId(uuidv4()), []);

  return (
    <nav onClick={onClick}>
      <Button
        className={Styles.NavigationButton}
        onClick={toggleMenu}
        aria-expanded={isExpanded}
        aria-controls={menuId}
        aria-label={b.NavigationButtonLabel()}
      >
        <List />
      </Button>

      <ul
        className={`${Styles.Menu} ${isExpanded ? Styles.Open : ''}`}
        id={menuId}
        role="menubar"
        aria-label={b.NavigationMenuLabel()}
      >
        <li role="none">
          <Hyperlink role="menuitem" href="/" onClick={hideMenu}>
            <House />
            <span>
              <b.HomeScreenName />
            </span>
          </Hyperlink>
        </li>
        <li role="none">
          <Hyperlink role="menuitem" href="/war-timer" onClick={hideMenu}>
            <Clock />
            <span>
              <b.WarTimerScreenName />
            </span>
          </Hyperlink>
        </li>
        <li role="none">
          <Hyperlink role="menuitem" href="/settings" onClick={hideMenu}>
            <Gear />
            <span>
              <b.SettingsScreenName />
            </span>
          </Hyperlink>
        </li>
      </ul>
    </nav>
  );
}
