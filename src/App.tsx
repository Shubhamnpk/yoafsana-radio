import { useState, lazy, Suspense, useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useStations } from '@/hooks/useStations';
import { useFavorites } from '@/hooks/useFavorites';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';

import { StationGrid } from '@/components/StationGrid';
const FavoritesList = lazy(() => import('@/components/favorites/preview/FavoritesList').then(module => ({ default: module.FavoritesList })));
import { Radio, Filter, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { RadioStation } from '@/types/radio';

import { SettingsDialog } from '@/components/SettingsDialog';
import { FloatingPlayer } from '@/components/FloatingPlayer';
import { UpdateNotification } from '@/components/UpdateNotification';

function App() {
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const isOnline = useOnlineStatus();

  const {
    stations,
    allStations,
    loading,
    error,
    filters,
    setFilters,
    provinces,
    hasMore,
    loadMore,
    refetch,
  } = useStations();

  const {
    isPlaying,
    currentStation,
    volume,
    play,
    pause,
    togglePlay,
    adjustVolume,
  } = useAudioPlayer();

  const {
    getFavoriteStations,
    isFavorite,
    toggleFavorite,
    updatePlayCount,
  } = useFavorites();

  const handlePlay = (station: RadioStation) => {
    play(station);
    if (isFavorite(station)) {
      updatePlayCount(station.id);
    }
  };

  const currentIndex = currentStation
    ? stations.findIndex((s) => s.id === currentStation.id)
    : -1;

  const handlePreviousStation = () => {
    if (currentIndex > 0) {
      handlePlay(stations[currentIndex - 1]);
    }
  };

  const handleNextStation = () => {
    if (currentIndex < stations.length - 1) {
      handlePlay(stations[currentIndex + 1]);
    }
  };

  // Auto-play disabled - users must manually select a station to play
  // useEffect(() => {
  //   if (!loading && stations.length > 0 && !currentStation && isOnline) {
  //     handlePlay(stations[0]);
  //   }
  // }, [loading, stations, currentStation, isOnline]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Yoafsana Radio
                </h1>
              </motion.div>
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    isOnline
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
                </motion.div>
                <SettingsDialog />
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-lg shadow-xl border border-border/50"
          >
            <Radio className="w-12 h-12 text-primary animate-pulse" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">Loading Your Stations</h2>
              <p className="text-sm text-muted-foreground">
                Preparing your personalized radio experience...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Yoafsana Radio
                </h1>
              </motion.div>
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    isOnline
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
                </motion.div>
                <SettingsDialog />
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-lg shadow-xl border border-border/50"
          >
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Radio className="w-6 h-6 text-destructive" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">Failed to Load Stations</h2>
              <p className="text-sm text-muted-foreground">
                {error}
              </p>
              <Button
                onClick={refetch}
                variant="outline"
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <UpdateNotification />
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Yoafsana Radio
                </h1>
              </motion.div>
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    isOnline
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
                </motion.div>
                <SettingsDialog />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full hidden sm:block"
                >
                  {stations.length} stations available
                </motion.p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <SearchBar
                value={filters.search}
                onChange={(search) => setFilters({ ...filters, search })}
              />

              <div className="flex items-center justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSearchFilters(!showSearchFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showSearchFilters ? 'Hide' : 'Show'} Filters
                </Button>
              </div>

              <AnimatePresence>
                {showSearchFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="sm:hidden overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border/50">
                      <FilterBar
                        filters={filters}
                        onFilterChange={(newFilters) =>
                          setFilters({ ...filters, ...newFilters })
                        }
                        provinces={provinces}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="hidden sm:block">
                <FilterBar
                  filters={filters}
                  onFilterChange={(newFilters) =>
                    setFilters({ ...filters, ...newFilters })
                  }
                  provinces={provinces}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto mobile-padding py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <Suspense fallback={<div>Loading favorites...</div>}>
            <FavoritesList
              stations={stations}
              currentStation={currentStation}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={pause}
              allStations={allStations} // Pass allStations here
            />
          </Suspense>

          <StationGrid
            stations={stations.filter(station => !isFavorite(station))}
            favoriteStations={getFavoriteStations(allStations)} // Use allStations here
            currentStation={currentStation}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={pause}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </motion.div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Fork of YoRadio
            </p>
            <p className="text-xs text-muted-foreground">
              A personalized radio streaming experience
            </p>
          </div>
        </div>
      </footer>

      <FloatingPlayer
        currentStation={currentStation}
        isPlaying={isPlaying}
        volume={volume}
        onVolumeChange={adjustVolume}
        onTogglePlay={togglePlay}
        onPreviousStation={currentIndex > 0 ? handlePreviousStation : undefined}
        onNextStation={
          currentIndex < stations.length - 1 ? handleNextStation : undefined
        }
        stations={stations}
        onStationSelect={handlePlay}
      />
    </div>
  );
}

export default App;