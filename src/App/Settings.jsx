import Button from '@components/Button';
import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
import IconButton from '@components/IconButton';
import SrOnly from '@components/SrOnly';
import Toolbar from '@components/Toolbar';
import content from '@content/Content.yaml';
import useCheckUpdates from '@hooks/useCheckUpdates';
import useContentBundle from '@hooks/useContentBundle';
import useZoom from '@hooks/useZoom';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import noop from '@utils/noop';
import React, { useEffect } from 'react';
import {
  CheckCircleFill,
  DashCircle,
  PlusCircle,
  XCircle,
} from 'react-bootstrap-icons';
import * as Styles from './Settings.scss';
import TimerDisplay from './WarTimer/Timer/TimerDisplay';

export default function Settings({ className }) {
  const _logger = new Logger('Settings');
  const b = useContentBundle(content);

  const [fontSize, onClickZoomIn, onClickZoomOut, onClickReset] = useZoom();

  const [
    appVersion,
    availableVersion,
    { checkAppUpdates, updateApp },
    versionError,
  ] = useCheckUpdates();

  useEffect(() => void checkAppUpdates(), []);

  return (
    <>
      <div className={Arrays.pack(className, Styles.Settings)}>
        <h1>
          <b.SettingsAppName />
        </h1>

        <h2>
          <b.AccessibilityHeader />
        </h2>
        <label>
          <span>
            <b.ZoomLabel />
          </span>
          <div>
            <IconButton onClick={onClickZoomOut}>
              <SrOnly>
                <b.ZoomOutLabel />
              </SrOnly>
              <DashCircle />
            </IconButton>
            <IconButton onClick={onClickZoomIn}>
              <SrOnly>
                <b.ZoomInLabel />
              </SrOnly>
              <PlusCircle />
            </IconButton>
            <IconButton onClick={onClickReset}>
              <SrOnly>
                <b.ResetButtonLabel />
              </SrOnly>
              <XCircle />
            </IconButton>
          </div>
        </label>
        {/* <label>
          <b.PreviewLabel />
          <div>
            <TimerDisplay
              remainingMillis={754_000}
              updateRemainingMillis={noop}
            />
          </div>
        </label> */}

        <h2>
          <b.SoftwareUpdateHeader />
        </h2>
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
          <Button onClick={checkAppUpdates}>
            <b.AppVersionCheckButtonLabel />
          </Button>
        )}
      </div>

      <Toolbar>
        <Hyperlink
          className={Arrays.pack(HyperlinkStyles.Button).join(' ')}
          href="/"
        >
          <b.HomeButtonLabel />
        </Hyperlink>
      </Toolbar>
    </>
  );
}
