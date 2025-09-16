import { Heart, Code, Info, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">About</h2>
          <p className="text-sm text-muted-foreground">
            Learn more about Yoafsana Radio
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Radio className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Yoafsana Radio
              </h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A personalized radio streaming experience built with modern web technologies.
            Discover and enjoy your favorite radio stations from around the world.
          </p>
        </motion.div>

        {/* Tribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-pink-500/5 to-rose-500/10 border border-pink-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-pink-500/20">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                Made with Love
              </h3>
              <p className="text-sm text-muted-foreground">For the Chocolate Lady</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This app is dedicated to <span className="font-medium text-pink-600 dark:text-pink-400">Apsana</span>,
              lovingly known as the Chocolate Lady, who hails from Bangladesh. Created with passion and care by{' '}
              <span className="font-medium text-primary">Shubham</span> from Nepal, celebrating the beautiful friendship between Nepal and Bangladesh.
            </p>
          </div>
        </motion.div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Technical Details</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Version:</span>
              <p className="font-mono">1.0.0</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Build:</span>
              <p className="font-mono">2025.01.16</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Framework:</span>
              <p>React + TypeScript</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Styling:</span>
              <p>Tailwind CSS</p>
            </div>
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-muted/30 border border-border/50"
        >
          <h3 className="text-lg font-semibold mb-4">Credits & Acknowledgments</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Built with ❤️ using modern web technologies and open-source libraries.
            </p>
            <p>
              Special thanks to the radio-browser.info API for providing the radio station data,
              and to the amazing open-source community for the tools that made this possible.
            </p>
            <p className="text-xs italic mt-4">
              Fork of YoRadio - Enhanced and personalized for Apsana
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}