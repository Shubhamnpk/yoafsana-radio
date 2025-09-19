import { Minimize2, X, Radio as RadioIcon, Expand, Shrink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioDisplay } from '@/components/display/RadioDisplay';
import { FullScreenDisplay } from '@/components/display/FullScreenDisplay';
import { AudioControls } from '@/components/controls/AudioControls';
import type { RadioStation } from '@/types/radio';
import { useFloatingPlayer } from '@/hooks/useFloatingPlayer';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface FloatingPlayerProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
  stations?: RadioStation[];
  onStationSelect?: (station: RadioStation) => void;
}

export function FloatingPlayer({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
  stations = [],
  onStationSelect,
}: FloatingPlayerProps) {
  const isOnline = useOnlineStatus();
  const {
    isVisible,
    isMinimized,
    isFullScreen,
    show,
    hide,
    minimize,
    maximize,
    toggleFullScreen,
  } = useFloatingPlayer();

  // Show player when a station starts playing
  if (currentStation && isPlaying && !isVisible) {
    show();
  }

  if (!currentStation || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed pointer-events-none z-[9999] ${
          isFullScreen ? 'inset-0' : 'inset-0'
        }`}
      >
        <div className={`absolute pointer-events-auto ${
          isFullScreen
            ? 'inset-0'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6'
        }`}>
          {isMinimized ? (
            <Button
              variant="default"
              size="lg"
              className="w-auto rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow glass-morphism"
              onClick={maximize}
            >
              <RadioIcon className={`w-6 h-6 text-foreground ${isPlaying ? 'animate-pulse' : ''}`} />
            </Button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`glass-morphism shadow-2xl overflow-y-auto ${
                isFullScreen
                  ? 'w-full h-full rounded-none relative'
                  : 'w-full sm:w-[380px] rounded-xl max-h-[80vh]'
              }`}
            >
              <div className={`flex items-center justify-between border-b border-border/10 ${
                isFullScreen ? 'p-6 absolute top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl' : 'p-3'
              }`}>
                <div className="flex items-center gap-2">
                  <RadioIcon className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-gradient">
                    {currentStation.frequency ? 'FM Radio' : 'Online Radio'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 hover:bg-background/50 rounded-lg"
                     onClick={toggleFullScreen}
                   >
                     {isFullScreen ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                   </Button>
                   {!isFullScreen && (
                     <Button
                       variant="ghost"
                       size="icon"
                       className="h-8 w-8 hover:bg-background/50 rounded-lg"
                       onClick={minimize}
                     >
                       <Minimize2 className="h-4 w-4" />
                     </Button>
                   )}
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 hover:bg-background/50 rounded-lg"
                     onClick={hide}
                   >
                     <X className="h-4 w-4" />
                   </Button>
                 </div>
              </div>

              {isFullScreen ? (
                <FullScreenDisplay
                  currentStation={currentStation}
                  isPlaying={isPlaying}
                  isOnline={isOnline}
                  volume={volume}
                  onVolumeChange={onVolumeChange}
                  onTogglePlay={onTogglePlay}
                  onPreviousStation={onPreviousStation}
                  onNextStation={onNextStation}
                  stations={stations}
                  onStationSelect={onStationSelect}
                />
              ) : (
                <div className="p-4 space-y-4">
                  <RadioDisplay
                    currentStation={currentStation}
                    isPlaying={isPlaying}
                  />
                  <AudioControls
                    currentStation={currentStation}
                    isPlaying={isPlaying}
                    volume={volume}
                    onVolumeChange={onVolumeChange}
                    onTogglePlay={onTogglePlay}
                    onPreviousStation={onPreviousStation}
                    onNextStation={onNextStation}
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}