import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
import Toolbar from '@components/Toolbar';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import AccessibilitySettings from './AccessibilitySettings';
import * as Styles from './Settings.scss';
import SoftwareUpdates from './SoftwareUpdates';

export default function Settings({ className }) {
  const _logger = new Logger('Settings');
  const b = useContentBundle(content);

  return (
    <>
      <div className={Arrays.pack(className, Styles.Settings)}>
        <h1>
          <b.SettingsAppName />
        </h1>

        <h2>
          <b.AccessibilitySettingsHeader />
        </h2>
        <AccessibilitySettings />

        <h2>
          <b.SoftwareUpdatesHeader />
        </h2>
        <SoftwareUpdates />
      </div>

      <Toolbar>
        <Hyperlink className={HyperlinkStyles.Button} href="/">
          <b.HomeButtonLabel />
        </Hyperlink>
      </Toolbar>
    </>
  );
}
