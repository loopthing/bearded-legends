import Button from '@components/Button';
import content from '@content/Content.yaml';
import useAppVersion from '@hooks/useAppVersion';
import useContentBundle from '@hooks/useContentBundle';
import Logger from '@utils/Logger';
import React, { useEffect } from 'react';
import { CheckCircleFill, ExclamationDiamondFill } from 'react-bootstrap-icons';

export default function SoftwareUpdates() {
  const _logger = new Logger('SoftwareUpdates');
  const b = useContentBundle(content);

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
        <b.AppVersionLabel />
        <div>{appVersion}</div>
      </label>
      <label>
        <b.AvailableAppVersionLabel />
        {versionError ? (
          <div>
            <ExclamationDiamondFill />
            <span>
              <b.AppVersionErrorMessage />
            </span>
          </div>
        ) : (
          <div>{availableVersion}</div>
        )}

        {!versionError && availableVersion === appVersion && (
          <div>
            <CheckCircleFill />
            <span>
              <b.AppVersionStatusMessage />
            </span>
          </div>
        )}
      </label>

      {/* {availableVersion !== appVersion && (
        <label>
          <Button onClick={updateApp}>
            <b.UpdateButtonLabel />
          </Button>
        </label>
      )} */}

      {/* <Button onClick={checkUpdates}>
        <b.AppVersionCheckButtonLabel />
      </Button> */}

      <Button onClick={updateApp}>
        <b.UpdateButtonLabel />
        {/* <b.ForceUpdateButtonLabel /> */}
      </Button>
    </>
  );
}
