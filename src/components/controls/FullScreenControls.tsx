import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FullScreenStationCard } from '../display/FullScreenStationCard';
import type { RadioStation } from '@/types/radio';

interface FullScreenControlsProps {
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

export function FullScreenControls({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
  stations = [],
  onStationSelect,
}: FullScreenControlsProps) {
  const [showStations, setShowStations] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-background/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-primary/20">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl" />
        {/* Main playback controls */}
        <div className="relative flex items-center justify-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
            onClick={onPreviousStation}
            disabled={!onPreviousStation}
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="default"
              size="icon"
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={onTogglePlay}
              disabled={!currentStation}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-white" />
              ) : (
                <Play className="h-7 w-7 ml-1 text-white" />
              )}
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
            onClick={onNextStation}
            disabled={!onNextStation}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume control */}
        <div className="relative flex items-center gap-3 max-w-md mx-auto bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-primary/10">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
            disabled={!currentStation}
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          <div className="flex-1 px-1">
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => onVolumeChange(value[0])}
              disabled={!currentStation}
              className="w-full"
            />
          </div>

          <div className="text-xs font-mono font-semibold text-primary min-w-[2.5rem] text-right bg-primary/10 px-2 py-1 rounded-full">
            {Math.round(volume * 100)}%
          </div>
        </div>

        {/* Station List */}
        {stations.length > 0 && onStationSelect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mt-3 pt-3 border-t border-primary/20"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-primary">Stations</h3>
              {stations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowStations(!showStations)}
                  className="text-xs h-7 px-2 text-primary hover:bg-primary/10"
                >
                  {showStations ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Hide Stations
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      Show Stations ({stations.length})
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {showStations && stations.slice(0, 5).map((station, index) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FullScreenStationCard
                      station={station}
                      isPlaying={isPlaying}
                      isCurrentStation={currentStation?.id === station.id}
                      onPlay={onStationSelect}
                      onPause={() => {}}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}