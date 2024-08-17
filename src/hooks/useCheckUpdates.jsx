import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';
import { useState } from 'react';

export default function useCheckUpdates() {
  const _logger = new Logger('useCheckUpdates');
  const [appVersion, setAppVersion] = useLocalStorage('BL.App.Version');
  const [availableVersion, setAvailableVersion] = useState(null);

  async function checkAppUpdates() {
    return fetch('/bearded-legends/package.json')
      .then((response) => response.json())
      .then((result) => {
        if (result && result.version) {
          setAvailableVersion(result.version);
        }
        return result.version;
      });
  }

  async function updateApp(version) {
    setAppVersion(version);

    return new Promise((resolve) => {
      resolve(window.location.reload());
    }, 0);
  }

  return [appVersion, availableVersion, { checkAppUpdates, updateApp }];
}
