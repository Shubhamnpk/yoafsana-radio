import { RadioStation } from '@/types/radio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FullScreenStationCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrentStation: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function FullScreenStationCard({
  station,
  isPlaying,
  isCurrentStation,
  onPlay,
  onPause,
}: FullScreenStationCardProps) {
  const handleClick = () => {
    if (isCurrentStation && isPlaying) {
      onPause();
    } else {
      onPlay(station);
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg cursor-pointer',
      isCurrentStation && 'ring-2 ring-primary bg-primary/5'
    )} onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate">{station.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Radio className="w-3 h-3" />
              {station.frequency ? `${station.frequency} MHz` : 'Online'}
            </div>
            {station.country && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {station.country}
              </p>
            )}
          </div>
          <Button
            variant={isCurrentStation ? "default" : "secondary"}
            size="sm"
            className="h-8 w-8 rounded-full shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {isCurrentStation && isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}