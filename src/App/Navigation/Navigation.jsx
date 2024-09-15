import Button from '@components/Button';
import Link from '@components/Link';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import * as AnimationStyles from '@styles/Animation.scss';
import React, { useEffect, useState } from 'react';
import {
  Clock,
  Gear,
  HourglassSplit,
  House,
  List,
} from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';
import * as Styles from './Navigation.scss';
import NavigationContent from './Navigation.yaml';
import DOM from '@utils/DOM';

export default function Navigation({ onClick }) {
  const [c, C] = useContent(GlobalContent, NavigationContent);
  const [menuId, setMenuId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleMenu = () => setIsExpanded((x) => !x);
  const hideMenu = () => setIsExpanded(false);

  useEffect(() => setMenuId(uuidv4()), []);

  return (
    <nav onClick={onClick}>
      <Button
        className={Styles.NavigationButton}
        onClick={toggleMenu}
        aria-expanded={isExpanded}
        aria-controls={menuId}
        aria-label={c.NavigationButtonLabel()}
      >
        <List />
      </Button>

      <ul
        className={DOM.classNames(
          Styles.Menu,
          isExpanded && Styles.Open,
          isExpanded && AnimationStyles.SlideUp,
        )}
        id={menuId}
        role="menubar"
        aria-label={c.NavigationMenuLabel()}
      >
        <li role="none">
          <Link role="menuitem" href="/" onClick={hideMenu}>
            <House />
            <span>{c.HomeScreenName()}</span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/war-timer" onClick={hideMenu}>
            <HourglassSplit />
            <span>{c.WarTimerScreenName()}</span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/timestamp" onClick={hideMenu}>
            <Clock />
            <span>{c.TimestampScreenName()}</span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/settings" onClick={hideMenu}>
            <Gear />
            <span>{c.SettingsScreenName()}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
