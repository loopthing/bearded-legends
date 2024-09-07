import Toolbar from '@components/Toolbar';
import globalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import DOM from '@utils/DOM';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import AccessibilitySettings from './AccessibilitySettings';
import * as Styles from './Settings.scss';
import settingsContent from './Settings.yaml';
import SoftwareUpdates from './SoftwareUpdates';

export default function Settings({ className }) {
  const {
    SettingsScreenName,
    AccessibilitySettingsHeader,
    SoftwareUpdatesHeader,
  } = useContentBundle(globalContent, settingsContent);

  return (
    <>
      <div className={DOM.classNames(className, Styles.Settings)}>
        <h1>
          <SettingsScreenName />
        </h1>

        <h2>
          <AccessibilitySettingsHeader />
        </h2>
        <AccessibilitySettings />

        <h2>
          <SoftwareUpdatesHeader />
        </h2>
        <SoftwareUpdates />
      </div>

      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
