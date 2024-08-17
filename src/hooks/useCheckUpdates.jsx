import { useLocalStorage } from '@hooks/useStorage';
import Logger from '@utils/Logger';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCheckUpdates() {
  const _logger = new Logger('useCheckUpdates');
  const [appVersion, setAppVersion] = useLocalStorage('BL.App.Version');
  const [availableVersion, setAvailableVersion] = useState(null);
  const navigate = useNavigate();

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

  async function updateApp() {
    setAppVersion(availableVersion);
    await new Promise((resolve) => setTimeout(resolve, 0));
    navigate('/', { replace: true });
    // window.location.reload();
  }

  return [appVersion, availableVersion, { checkAppUpdates, updateApp }];
}
