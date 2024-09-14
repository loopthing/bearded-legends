// import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';
import { useState } from 'react';
import pkg from '../../package.json';

const { version: appVersion } = pkg;

export default function useAppVersion() {
  const _logger = new Logger('useAppVersion');
  // const [appVersion, setAppVersion] = useLocalStorage('BL.App.version');
  const [availableVersion, setAvailableVersion] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  //
  // TODO Show progress on Settings page
  //

  async function checkUpdates() {
    setProgress(0);
    setError(null);

    return fetch(`/bearded-legends/package.json?bust=${Date.now()}`)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.version) {
          setAvailableVersion(result.version);
        }
        return result.version;
      })
      .catch(setError)
      .finally(() => setProgress(1));
  }

  async function updateApp() {
    const now = Date.now();

    await fetch(`/bearded-legends/index.html?bust=${now}`);
    await fetch(`/bearded-legends/bundle.js?bust=${now}`);

    window.root.unmount();

    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.async = true;
      script.src = `/bearded-legends/bundle.js?bust=${now}`;
    });

    // await new Promise((resolve) => setTimeout(resolve, 400));
    // window.location.reload();
  }

  return [
    appVersion,
    availableVersion,
    { checkUpdates, updateApp },
    error,
    progress,
  ];
}
