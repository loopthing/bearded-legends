import Button from '@components/Button';
import globalContent from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useZoom from '@hooks/useZoom';
import Logger from '@utils/Logger';
import React from 'react';
import { DashCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';
import settingsContent from './Settings.yaml';

export default function AccessibilitySettings() {
  const _logger = new Logger('Settings');
  const {
    AccessibilitySettings: {
      ZoomFieldSetLabel,
      ZoomOutButtonLabel,
      ZoomInButtonLabel,
    },
    ResetButtonLabel,
  } = useContentBundle(globalContent, settingsContent);
  const [fontSize, onClickZoomIn, onClickZoomOut, onClickReset] = useZoom();

  return (
    <fieldset>
      <legend>
        <ZoomFieldSetLabel />
      </legend>

      <Button onClick={onClickZoomIn}>
        <PlusCircle />
        <span>
          <ZoomInButtonLabel />
        </span>
      </Button>

      <Button onClick={onClickZoomOut}>
        <DashCircle />
        <span>
          <ZoomOutButtonLabel />
        </span>
      </Button>

      <Button onClick={onClickReset}>
        <XCircle />
        <span>
          <ResetButtonLabel />
        </span>
      </Button>
    </fieldset>
  );
}
