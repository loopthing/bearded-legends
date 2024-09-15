import Button from '@components/Button';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import useZoom from '@hooks/useZoom';
import Logger from '@utils/Logger';
import React from 'react';
import { DashCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';
import SettingsContent from './Settings.yaml';

export default function AccessibilitySettings() {
  const _logger = new Logger('Settings');

  const {
    AccessibilitySettings: {
      ZoomFieldSetLabel,
      ZoomOutButtonLabel,
      ZoomInButtonLabel,
    },
    ResetButtonLabel,
  } = useContent(GlobalContent, SettingsContent);

  const [fontSize, onClickZoomIn, onClickZoomOut, onClickReset] = useZoom();

  return (
    <fieldset>
      <legend>{ZoomFieldSetLabel()}</legend>

      <Button onClick={onClickZoomIn}>
        <PlusCircle />
        <span>{ZoomInButtonLabel()}</span>
      </Button>

      <Button onClick={onClickZoomOut}>
        <DashCircle />
        <span>{ZoomOutButtonLabel()}</span>
      </Button>

      <Button onClick={onClickReset}>
        <XCircle />
        <span>{ResetButtonLabel()}</span>
      </Button>
    </fieldset>
  );
}
