import Button from '@components/Button';
import content from '@content/Content.yaml';
import useAppVersion from '@hooks/useAppVersion';
import useContentBundle from '@hooks/useContentBundle';
import Logger from '@utils/Logger';
import React, { useEffect } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';

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
        {versionError ? (
          <div>Error</div>
        ) : (
          availableVersion === appVersion && (
            <div>
              <CheckCircleFill />
              <span>
                <b.AppVersionStatusMessage />
              </span>
            </div>
          )
        )}
      </label>
      {availableVersion !== appVersion ? (
        <label>
          <b.AvailableAppVersionLabel />
          <div>{availableVersion}</div>
          <Button onClick={updateApp}>
            <b.UpdateInstructionMessage />
          </Button>
        </label>
      ) : (
        <Button onClick={checkUpdates}>
          <b.AppVersionCheckButtonLabel />
        </Button>
      )}
    </>
  );
}
