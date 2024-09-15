import Button from '@components/Button';
import Link from '@components/Link';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
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
        // className={`${Styles.Menu} ${isExpanded ? AnimationStyles.SlideUp : ''}`}
        className={DOM.classNames(
          Styles.Menu,
          isExpanded && Styles.Open,
          isExpanded && AnimationStyles.SlideUp,
        )}
        id={menuId}
        role="menubar"
        aria-label={b.NavigationMenuLabel()}
      >
        <li role="none">
          <Link role="menuitem" href="/" onClick={hideMenu}>
            <House />
            <span>
              <b.HomeScreenName />
            </span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/war-timer" onClick={hideMenu}>
            <HourglassSplit />
            <span>
              <b.WarTimerScreenName />
            </span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/timestamp" onClick={hideMenu}>
            <Clock />
            <span>
              <b.TimestampScreenName />
            </span>
          </Link>
        </li>

        <li role="none">
          <Link role="menuitem" href="/settings" onClick={hideMenu}>
            <Gear />
            <span>
              <b.SettingsScreenName />
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
