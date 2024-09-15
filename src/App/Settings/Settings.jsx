import Toolbar from '@components/Toolbar';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import DOM from '@utils/DOM';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import AccessibilitySettings from './AccessibilitySettings';
import * as Styles from './Settings.scss';
import SettingsContent from './Settings.yaml';
import SoftwareUpdates from './SoftwareUpdates';

export default function Settings({ className }) {
  const {
    SettingsScreenHeader,
    AccessibilitySettingsHeader,
    SoftwareUpdatesHeader,
  } = useContent(GlobalContent, SettingsContent);

  return (
    <>
      <div className={DOM.classNames(className, Styles.Settings)}>
        <h1 tabIndex="-1">{SettingsScreenHeader()}</h1>

        <h2>{AccessibilitySettingsHeader()}</h2>
        <AccessibilitySettings />

        <h2>{SoftwareUpdatesHeader()}</h2>
        <SoftwareUpdates />
      </div>

      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
