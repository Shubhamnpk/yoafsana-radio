import { useState, lazy, Suspense } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useStations } from '@/hooks/useStations';
import { useFavorites } from '@/hooks/useFavorites';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';

const StationGrid = lazy(() => import('@/components/StationGrid').then(module => ({ default: module.StationGrid })));
const FavoritesList = lazy(() => import('@/components/favorites/preview/FavoritesList').then(module => ({ default: module.FavoritesList })));
import { Radio, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { RadioStation } from '@/types/radio';

const SettingsDialog = lazy(() => import('@/components/SettingsDialog').then(module => ({ default: module.SettingsDialog })));
const FloatingPlayer = lazy(() => import('@/components/FloatingPlayer').then(module => ({ default: module.FloatingPlayer })));

function App() {
  const [showSearchFilters, setShowSearchFilters] = useState(false);

  const {
    stations,
    allStations,
    loading,
    filters,
    setFilters,
    provinces,
    hasMore,
    loadMore,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
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
                <Suspense fallback={<Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10"><Settings className="h-5 w-5" /><span className="sr-only">Settings</span></Button>}>
                  <SettingsDialog />
                </Suspense>
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

          <Suspense fallback={<div>Loading stations...</div>}>
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
          </Suspense>
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

      <Suspense fallback={null}>
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
        />
      </Suspense>
    </div>
  );
}

export default App;