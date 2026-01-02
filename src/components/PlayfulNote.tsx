import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PlayfulNote = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="my-16 flex justify-center">
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {/* Crossed out text - like a handwritten correction */}
        <span className="font-display text-lg text-muted-foreground/60 relative">
          <span className="relative">
            You're okay I guess
            <motion.span
              className="absolute left-0 top-1/2 w-full h-[2px] bg-muted-foreground/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4 }}
              style={{ originX: 0 }}
            />
          </span>
        </span>

        {/* Replacement text */}
        <motion.span
          className="ml-3 font-display text-lg text-primary italic"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          You're important
        </motion.span>
      </motion.div>
    </div>
  );
};

export const DoNotClickButton = () => {
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const messages = [
    "I said don't click!",
    "You're so curious...",
    "There is nothing here!",
    "I told you",
    "Okay, you win, here's a secret message: You are amazing!",
  ];

  const handleClick = () => {
    setClicked(true);
    setClickCount((prev) => (prev + 1) % messages.length);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.button
        onClick={handleClick}
        className="font-body text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 underline underline-offset-4 decoration-dashed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        (please do not click here)
      </motion.button>

      <AnimatePresence mode="wait">
        {clicked && (
          <motion.p
            key={clickCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="font-display text-primary text-sm"
          >
            {messages[clickCount]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayfulNote;
