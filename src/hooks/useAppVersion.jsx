import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';
import { useState } from 'react';

export default function useAppVersion() {
  const _logger = new Logger('useAppVersion');
  const [appVersion, setAppVersion] = useLocalStorage('BL.App.version');
  const [availableVersion, setAvailableVersion] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  //
  // TODO Show progress on Settings page
  //

  async function checkUpdates() {
    setProgress(0);

    return fetch('/bearded-legends/package.json')
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
    if (!availableVersion) {
      await checkUpdates();
    }

    setAppVersion(availableVersion);
    await new Promise((resolve) => setTimeout(resolve, 400));
    window.location.reload();
  }

  return [
    appVersion,
    availableVersion,
    { checkUpdates, updateApp },
    error,
    progress,
  ];
}
