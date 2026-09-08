'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;
    let reloading = false;

    const handleControllerChange = () => {
      if (reloading || !navigator.serviceWorker.controller) return;
      reloading = true;
      window.location.reload();
    };

    const checkForUpdate = () => {
      void registration?.update().catch(() => undefined);
    };

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange,
    );

    void navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((activeRegistration) => {
        registration = activeRegistration;
        return activeRegistration.update();
      })
      .catch(() => undefined);

    window.addEventListener('focus', checkForUpdate);

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleControllerChange,
      );
      window.removeEventListener('focus', checkForUpdate);
    };
  }, []);
  return null;
}
