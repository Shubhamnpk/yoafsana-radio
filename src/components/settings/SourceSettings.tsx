import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioTower, Info, Database, Globe, MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { radioSources } from '@/config/sources';
import { useSourceSettings } from '@/hooks/useSourceSettings';
import { motion } from 'framer-motion';

const countries = [
  { value: 'bangladesh', label: '🇧🇩 Bangladesh' },
  { value: 'india', label: '🇮🇳 India' },
  { value: 'pakistan', label: '🇵🇰 Pakistan' },
  { value: 'united states', label: '🇺🇸 United States' },
  { value: 'united kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'germany', label: '🇩🇪 Germany' },
  { value: 'france', label: '🇫🇷 France' },
  { value: 'italy', label: '🇮🇹 Italy' },
  { value: 'spain', label: '🇪🇸 Spain' },
  { value: 'canada', label: '🇨🇦 Canada' },
  { value: 'australia', label: '🇦🇺 Australia' },
  { value: 'japan', label: '🇯🇵 Japan' },
  { value: 'china', label: '🇨🇳 China' },
  { value: 'south korea', label: '🇰🇷 South Korea' },
  { value: 'brazil', label: '🇧🇷 Brazil' },
  { value: 'mexico', label: '🇲🇽 Mexico' },
  { value: 'argentina', label: '🇦🇷 Argentina' },
  { value: 'russia', label: '🇷🇺 Russia' },
  { value: 'turkey', label: '🇹🇷 Turkey' },
  { value: 'egypt', label: '🇪🇬 Egypt' },
  { value: 'south africa', label: '🇿🇦 South Africa' },
  { value: 'nigeria', label: '🇳🇬 Nigeria' },
  { value: 'kenya', label: '🇰🇪 Kenya' },
  { value: 'netherlands', label: '🇳🇱 Netherlands' },
  { value: 'sweden', label: '🇸🇪 Sweden' },
  { value: 'norway', label: '🇳🇴 Norway' },
  { value: 'denmark', label: '🇩🇰 Denmark' },
  { value: 'finland', label: '🇫🇮 Finland' },
  { value: 'poland', label: '🇵🇱 Poland' },
  { value: 'czech republic', label: '🇨🇿 Czech Republic' },
  { value: 'hungary', label: '🇭🇺 Hungary' },
  { value: 'greece', label: '🇬🇷 Greece' },
  { value: 'portugal', label: '🇵🇹 Portugal' },
  { value: 'switzerland', label: '🇨🇭 Switzerland' },
  { value: 'austria', label: '🇦🇹 Austria' },
  { value: 'belgium', label: '🇧🇪 Belgium' },
  { value: 'ireland', label: '🇮🇪 Ireland' },
  { value: 'new zealand', label: '🇳🇿 New Zealand' },
  { value: 'singapore', label: '🇸🇬 Singapore' },
  { value: 'malaysia', label: '🇲🇾 Malaysia' },
  { value: 'thailand', label: '🇹🇭 Thailand' },
  { value: 'indonesia', label: '🇮🇩 Indonesia' },
  { value: 'philippines', label: '🇵🇭 Philippines' },
  { value: 'vietnam', label: '🇻🇳 Vietnam' },
];

export function SourceSettings() {
  const { enabledSources, toggleSource, radioBrowserCountry, setRadioBrowserCountry, standardSourceMode, setStandardSourceMode } = useSourceSettings();

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-center gap-2">
          <RadioTower className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Radio Sources</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Configure your radio station sources and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {radioSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 sm:p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 touch-manipulation"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  {source.id === 'default' ? <Database className="w-5 h-5 text-primary" /> : <Globe className="w-5 h-5 text-primary" />}
                  <Label htmlFor={source.id} className="text-base sm:text-sm font-medium">
                    {source.name}
                  </Label>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <button type="button" className="cursor-help touch-target">
                        <Info className="w-5 h-5 sm:w-4 sm:h-4 text-muted-foreground hover:text-primary transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs bg-popover/95 backdrop-blur-sm"
                    >
                      <p className="text-sm">{source.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {source.description}
                </p>

                {/* Integrated mode selection for default source */}
                {source.id === 'default' && enabledSources.includes('default') && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-3 border-t border-border/30 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <Label className="text-sm font-medium text-primary">
                        Source Mode
                      </Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Label htmlFor={`${source.id}-production-mode`} className="text-sm">Production</Label>
                        <Switch
                          id={`${source.id}-production-mode`}
                          checked={standardSourceMode === 'beta'}
                          onCheckedChange={(checked) => setStandardSourceMode(checked ? 'beta' : 'production')}
                          className="data-[state=checked]:bg-orange-500"
                        />
                        <Label htmlFor={`${source.id}-production-mode`} className="text-sm">Beta</Label>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Production uses active stations. Beta includes the full index for more options.
                    </p>
                  </motion.div>
                )}

                {/* Integrated country selection for radio-browser source */}
                {source.id === 'radio-browser' && enabledSources.includes('radio-browser') && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-3 border-t border-border/30 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <Label className="text-sm font-medium text-primary">
                        Country Selection
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Select value={radioBrowserCountry} onValueChange={setRadioBrowserCountry}>
                        <SelectTrigger className="w-full bg-background/50 hover:bg-background/70 transition-colors">
                          <SelectValue placeholder="Choose a country..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                              className="cursor-pointer hover:bg-accent"
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Select the country for Radio Browser stations. Default: Bangladesh
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
              <Switch
                id={source.id}
                checked={enabledSources.includes(source.id)}
                onCheckedChange={() => toggleSource(source.id)}
                className="data-[state=checked]:bg-primary mt-1"
              />
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}