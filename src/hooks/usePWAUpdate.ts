import { useState, useEffect } from 'react';

interface PWAUpdateState {
  isUpdateAvailable: boolean;
  isInstalling: boolean;
  updateApp: () => void;
  registration: ServiceWorkerRegistration | null;
}

export function usePWAUpdate(): PWAUpdateState {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Wait for VitePWA to register the service worker
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);

        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
              }
            });
          }
        });

        // Listen for controller change (when new SW takes control)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      });

      // Check for updates periodically
      const updateInterval = setInterval(() => {
        if (registration) {
          registration.update();
        }
      }, 60 * 60 * 1000); // Check every hour

      return () => clearInterval(updateInterval);
    }
  }, [registration]);

  const updateApp = () => {
    if (registration && registration.waiting) {
      setIsInstalling(true);

      // Tell the waiting service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // The page will reload automatically when the new SW takes control
    } else {
      // Fallback: reload the page to get the latest version
      window.location.reload();
    }
  };

  return {
    isUpdateAvailable,
    isInstalling,
    updateApp,
    registration,
  };
}