import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';
import { useState } from 'react';

export default function useCheckUpdates() {
  const _logger = new Logger('useCheckUpdates');
  const [appVersion, setAppVersion] = useLocalStorage('BL.App.Version');
  const [availableVersion, setAvailableVersion] = useState(null);
  const [error, setError] = useState(null);

  async function checkAppUpdates() {
    return fetch('/bearded-legends/package.json')
      .then((response) => response.json())
      .then((result) => {
        if (result && result.version) {
          setAvailableVersion(result.version);
        }
        return result.version;
      })
      .catch(setError);
  }

  async function updateApp() {
    if (!availableVersion) {
      await checkAppUpdates();
    }

    setAppVersion(availableVersion);
    await new Promise((resolve) => setTimeout(resolve, 400));
    window.location.reload();
  }

  return [appVersion, availableVersion, { checkAppUpdates, updateApp }, error];
}
