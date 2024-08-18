import { useLocalStorage } from '@hooks/useStorage';
import { useEffect } from 'react';

const DEFAULT_FONT_SIZE = 16;
const INCREMENT = DEFAULT_FONT_SIZE / 4;
const MINIMUM_FONT_SIZE = DEFAULT_FONT_SIZE - 2 * INCREMENT;

export default function useZoom() {
  const [fontSize, setFontSize] = useLocalStorage(
    'BL.App.fontSize',
    DEFAULT_FONT_SIZE,
  );

  const zoomIn = (_domEvent) => {
    setFontSize(Math.round(fontSize + INCREMENT));
  };

  const zoomOut = (_domEvent) => {
    setFontSize(Math.max(MINIMUM_FONT_SIZE, Math.round(fontSize - INCREMENT)));
  };

  const reset = (_domEvent) => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return [fontSize, zoomIn, zoomOut, reset];
}
