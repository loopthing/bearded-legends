import Button from '@components/Button';
import content from './Settings.yaml';
import useAppVersion from '@hooks/useAppVersion';
import useContentBundle from '@hooks/useContentBundle';
import React, { useEffect } from 'react';
import { CheckCircleFill, ExclamationDiamondFill } from 'react-bootstrap-icons';

export default function SoftwareUpdates() {
  const {
    SoftwareUpdates: {
      AppVersionLabel,
      AvailableAppVersionLabel,
      SoftwareUpdatesErrorMessage,
      SoftwareUpdatesStatusMessage,
      UpdateButtonLabel,
    },
  } = useContentBundle(content);

  const [
    appVersion,
    availableVersion,
    { checkUpdates, updateApp },
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

        {!versionError && availableVersion === appVersion && (
          <div>
            <CheckCircleFill />
            <span>
              <SoftwareUpdatesStatusMessage.UpToDate />
            </span>
          </div>
        )}
      </label>

      <Button onClick={updateApp}>
        <UpdateButtonLabel />
      </Button>
    </>
  );
}
