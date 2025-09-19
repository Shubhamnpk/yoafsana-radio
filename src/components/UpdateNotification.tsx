import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, X, RefreshCw } from 'lucide-react';
import { usePWAUpdate } from '@/hooks/usePWAUpdate';

export function UpdateNotification() {
  const { isUpdateAvailable, isInstalling, updateApp } = usePWAUpdate();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isUpdateAvailable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-4 left-4 right-4 z-[1000] md:left-auto md:right-4 md:w-96"
      >
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-lg shadow-lg border border-primary/20 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/10 rounded-full">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Update Available</h3>
                <p className="text-xs opacity-90 mt-1">
                  A new version of Yoafsana Radio is ready to install
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsDismissed(true)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={updateApp}
              disabled={isInstalling}
            >
              {isInstalling ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Installing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Update Now
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsDismissed(true)}
            >
              Later
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}