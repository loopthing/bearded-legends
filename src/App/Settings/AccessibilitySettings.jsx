import IconButton from '@components/IconButton';
import SrOnly from '@components/SrOnly';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useZoom from '@hooks/useZoom';
import Logger from '@utils/Logger';
import React from 'react';
import { DashCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';

export default function AccessibilitySettings() {
  const _logger = new Logger('Settings');
  const b = useContentBundle(content);
  const [fontSize, onClickZoomIn, onClickZoomOut, onClickReset] = useZoom();

  return (
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
  );
}
