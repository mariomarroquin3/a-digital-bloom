import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Show the player after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, that's fine
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Audio element - replace src with your music file */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src="/placeholder-music.mp3"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={togglePlay}
            className="fixed bottom-6 left-6 z-40 p-4 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-card hover:shadow-glow transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            <motion.div
              className="relative"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 8,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </motion.div>

            {/* Animated rings when playing */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20"
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tooltip hint */}
      <AnimatePresence>
        {isVisible && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-7 left-20 z-40 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border/30 shadow-soft"
          >
            <div className="flex items-center gap-2">
              <Music className="w-3 h-3 text-primary" />
              <span className="text-xs font-body text-muted-foreground">
                Play music
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
