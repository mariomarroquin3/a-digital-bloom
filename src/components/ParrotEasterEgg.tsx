import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ParrotEasterEgg = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasFlown, setHasFlown] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setTimeout(() => setHasFlown(true), 3000);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Small trigger element - looks like a decorative leaf/feather */}
      {!isRevealed && (
        <motion.button
          onClick={handleClick}
          className="w-4 h-4 opacity-30 hover:opacity-60 transition-opacity duration-500 cursor-pointer"
          whileHover={{ rotate: 10 }}
          aria-label="Hidden surprise"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary/50">
            <path
              fill="currentColor"
              d="M20 11c0 4.97-4.03 9-9 9-1.29 0-2.52-.27-3.63-.76l-.37.17c.86.38 1.81.59 2.8.59 4.42 0 8-3.58 8-8s-3.58-8-8-8c-.99 0-1.94.21-2.8.59l.37.17C8.48 4.27 9.71 4 11 4c4.97 0 9 4.03 9 9z"
            />
          </svg>
        </motion.button>
      )}

      {/* Parrot reveal */}
      <AnimatePresence>
        {isRevealed && !hasFlown && (
          <motion.div
            initial={{ x: 100, opacity: 0, rotate: -20 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              rotate: [0, 5, -5, 0],
            }}
            exit={{ 
              x: -300, 
              y: -200, 
              opacity: 0,
              rotate: 15,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
          >
            {/* Parrot SVG illustration - minimal elegant style */}
            <svg viewBox="0 0 80 100" className="w-16 h-20 md:w-20 md:h-24">
              {/* Body */}
              <motion.ellipse
                cx="40"
                cy="55"
                rx="18"
                ry="28"
                fill="hsl(160 60% 45%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              {/* Wing */}
              <motion.path
                d="M25 50 Q15 60 20 75 Q35 70 40 55"
                fill="hsl(170 50% 35%)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              {/* Head */}
              <motion.circle
                cx="40"
                cy="28"
                r="14"
                fill="hsl(160 60% 45%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              {/* Beak */}
              <motion.path
                d="M54 28 Q62 30 58 36 Q54 38 52 34"
                fill="hsl(35 80% 55%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              {/* Eye */}
              <motion.circle
                cx="45"
                cy="25"
                r="3"
                fill="hsl(0 0% 10%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              />
              <motion.circle
                cx="46"
                cy="24"
                r="1"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
              />
              {/* Tail feathers */}
              <motion.path
                d="M35 80 Q30 95 25 100"
                stroke="hsl(200 60% 50%)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              />
              <motion.path
                d="M40 82 Q40 97 42 102"
                stroke="hsl(50 70% 55%)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              />
              <motion.path
                d="M45 80 Q50 95 55 98"
                stroke="hsl(350 65% 55%)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              />
            </svg>

            {/* Message bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute -top-16 -left-24 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft border border-border/50"
            >
              <p className="font-display text-sm text-primary whitespace-nowrap">
                Polly says you're amazing! 🦜
              </p>
              <div className="absolute bottom-0 right-8 translate-y-1/2 w-3 h-3 bg-card/95 border-r border-b border-border/50 rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After flying away, show subtle message */}
      <AnimatePresence>
        {hasFlown && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-xs font-body text-muted-foreground"
          >
            *flew away*
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParrotEasterEgg;
