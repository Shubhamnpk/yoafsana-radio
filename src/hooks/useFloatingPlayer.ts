import { useState, useCallback } from 'react';

export function useFloatingPlayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
    setIsMinimized(true);
    setIsFullScreen(false);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    setIsFullScreen(false);
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
    setIsFullScreen(false);
  }, []);

  const maximize = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev);
    setIsMinimized(false);
  }, []);

  return {
    isVisible,
    isMinimized,
    isFullScreen,
    show,
    hide,
    minimize,
    maximize,
    toggleFullScreen,
  };
}