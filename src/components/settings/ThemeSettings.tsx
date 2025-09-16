import { Moon, Sun, Laptop, Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme, themes } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <div>
          <Label className="text-lg font-semibold">Theme</Label>
          <p className="text-sm text-muted-foreground">
            Choose your preferred color scheme
          </p>
        </div>
      </div>

      <ScrollArea className="h-[300px] sm:h-[250px] pr-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
          {themes.map(({ value, label, isDark }, index) => {
            const Icon = isDark ? Moon : value === 'system' ? Laptop : Sun;

            return (
              <motion.button
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'flex flex-col items-center gap-4 p-6 sm:p-4 rounded-xl border transition-all duration-200',
                  'hover:shadow-lg touch-manipulation',
                  theme === value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border/50 hover:border-primary/50 hover:bg-accent/50'
                )}
                onClick={() => setTheme(value)}
              >
                <div className={cn(
                  'w-16 h-16 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors',
                  theme === value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  <Icon className="w-8 h-8 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-sm font-medium">{label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            System theme will automatically switch between light and dark based on your system preferences.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}