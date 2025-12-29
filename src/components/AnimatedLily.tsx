import { motion } from "framer-motion";

interface AnimatedLilyProps {
  isComplete?: boolean;
}

const AnimatedLily = ({ isComplete = false }: AnimatedLilyProps) => {
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.3,
          duration: 2,
          ease: "easeInOut",
        },
        opacity: { delay: i * 0.3, duration: 0.3 },
      },
    }),
  };

  const bloomVariants = {
    initial: { scale: 1, opacity: 1 },
    bloom: {
      scale: [1, 1.15, 1.05],
      opacity: [1, 1, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-48 h-48 md:w-56 md:h-56"
      initial="hidden"
      animate={isComplete ? "bloom" : "visible"}
      variants={isComplete ? bloomVariants : undefined}
    >
      {/* Lily petals - drawn line by line */}
      <motion.path
        d="M100 140 Q90 120 70 100 Q50 80 60 60 Q70 40 100 50"
        fill="none"
        stroke="hsl(270 50% 80%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0}
        variants={drawVariants}
      />
      <motion.path
        d="M100 50 Q130 40 140 60 Q150 80 130 100 Q110 120 100 140"
        fill="none"
        stroke="hsl(270 50% 80%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.5}
        variants={drawVariants}
      />
      <motion.path
        d="M100 140 Q85 115 65 110 Q40 105 35 85 Q30 65 55 55"
        fill="none"
        stroke="hsl(280 45% 75%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1}
        variants={drawVariants}
      />
      <motion.path
        d="M145 55 Q170 65 165 85 Q160 105 135 110 Q115 115 100 140"
        fill="none"
        stroke="hsl(280 45% 75%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1.5}
        variants={drawVariants}
      />
      <motion.path
        d="M100 140 Q95 110 85 95 Q70 75 75 50 Q80 30 100 25"
        fill="none"
        stroke="hsl(285 40% 85%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={2}
        variants={drawVariants}
      />
      <motion.path
        d="M100 25 Q120 30 125 50 Q130 75 115 95 Q105 110 100 140"
        fill="none"
        stroke="hsl(285 40% 85%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={2.5}
        variants={drawVariants}
      />
      
      {/* Center details */}
      <motion.circle
        cx="100"
        cy="100"
        r="8"
        fill="none"
        stroke="hsl(270 55% 60%)"
        strokeWidth="1.5"
        custom={3}
        variants={drawVariants}
      />
      <motion.path
        d="M95 98 Q100 95 105 98"
        fill="none"
        stroke="hsl(270 55% 60%)"
        strokeWidth="1"
        strokeLinecap="round"
        custom={3.2}
        variants={drawVariants}
      />
      
      {/* Stem */}
      <motion.path
        d="M100 140 Q100 160 98 180"
        fill="none"
        stroke="hsl(120 25% 45%)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={3.5}
        variants={drawVariants}
      />
      
      {/* Small leaves on stem */}
      <motion.path
        d="M98 155 Q85 150 80 160"
        fill="none"
        stroke="hsl(120 25% 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={4}
        variants={drawVariants}
      />
      <motion.path
        d="M99 165 Q112 160 115 168"
        fill="none"
        stroke="hsl(120 25% 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={4.2}
        variants={drawVariants}
      />
    </motion.svg>
  );
};

export default AnimatedLily;
