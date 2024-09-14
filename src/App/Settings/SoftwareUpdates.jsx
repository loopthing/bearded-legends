import Button from '@components/Button';
import useAppVersion from '@hooks/useAppVersion';
import useContentBundle from '@hooks/useContentBundle';
import React, { useEffect } from 'react';
import { CheckCircleFill, ExclamationDiamondFill } from 'react-bootstrap-icons';
import SettingsContent from './Settings.yaml';

export default function SoftwareUpdates() {
  const {
    SoftwareUpdates: {
      AppVersionLabel,
      AvailableAppVersionLabel,
      SoftwareUpdatesErrorMessage,
      SoftwareUpdatesStatusMessage,
      ReloadButtonLabel,
      UpdateButtonLabel,
    },
  } = useContentBundle(SettingsContent);

  const [
    appVersion,
    availableVersion,
    { checkUpdates, updateApp, reloadApp },
    versionError,
  ] = useAppVersion();

  useEffect(() => void checkUpdates(), []);

  return (
    <>
      <label>
        <AppVersionLabel />
        <div>{appVersion}</div>
      </label>
      <label>
        <AvailableAppVersionLabel />
        {versionError ? (
          <div>
            <ExclamationDiamondFill />
            <span>
              <SoftwareUpdatesErrorMessage />
            </span>
          </div>
        ) : (
          <div>{availableVersion}</div>
        )}

        {!versionError && availableVersion === appVersion ? (
          <>
            <div>
              <CheckCircleFill />
              <span>
                <SoftwareUpdatesStatusMessage.UpToDate />
              </span>
            </div>
            <Button onClick={reloadApp}>
              <ReloadButtonLabel />
            </Button>
          </>
        ) : (
          <Button onClick={updateApp}>
            <UpdateButtonLabel />
          </Button>
        )}
      </label>
    </>
  );
}
