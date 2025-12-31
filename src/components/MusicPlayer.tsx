import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, SkipBack, SkipForward } from "lucide-react";

// Playlist - add your songs here
const playlist = [
  { title: "Song 1", src: "/placeholder-music.mp3" },
  { title: "Song 2", src: "/placeholder-music.mp3" },
  { title: "Song 3", src: "/placeholder-music.mp3" },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        src={playlist[currentTrack].src}
        onEnded={handleTrackEnd}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 left-6 z-40"
          >
            <motion.div
              className={`flex items-center gap-2 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-card transition-all duration-300 ${isExpanded ? 'pr-4' : ''}`}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              {/* Previous button */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={prevTrack}
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Play/Pause button */}
              <motion.button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                <motion.div
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

              {/* Next button */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={nextTrack}
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Track info */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <span className="text-xs font-body text-muted-foreground whitespace-nowrap pl-2">
                      {playlist[currentTrack].title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip hint */}
      <AnimatePresence>
        {isVisible && !isPlaying && !isExpanded && (
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
