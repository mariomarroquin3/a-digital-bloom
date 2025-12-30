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
          delay: i * 0.25,
          duration: 1.8,
          ease: "easeInOut",
        },
        opacity: { delay: i * 0.25, duration: 0.4 },
      },
    }),
  };

  const bloomVariants = {
    initial: { scale: 1, opacity: 1 },
    bloom: {
      scale: [1, 1.2, 1.1],
      opacity: [1, 1, 0],
      filter: ["blur(0px)", "blur(0px)", "blur(8px)"],
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.95, 1.05, 0.95],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      {/* Soft glow effect behind the lily */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "scale(1.5)",
        }}
        variants={glowVariants}
        initial="hidden"
        animate={isComplete ? "hidden" : "visible"}
      />

      <motion.svg
        viewBox="0 0 200 200"
        className="w-48 h-48 md:w-56 md:h-56 relative z-10"
        initial="hidden"
        animate={isComplete ? "bloom" : "visible"}
        variants={isComplete ? bloomVariants : undefined}
      >
        {/* Main petals - outer layer */}
        <motion.path
          d="M100 140 Q85 115 60 95 Q35 75 45 50 Q55 30 85 35 Q100 38 100 50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={0}
          variants={drawVariants}
        />
        <motion.path
          d="M100 50 Q100 38 115 35 Q145 30 155 50 Q165 75 140 95 Q115 115 100 140"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={0.4}
          variants={drawVariants}
        />

        {/* Middle petals */}
        <motion.path
          d="M100 140 Q80 110 55 100 Q25 90 20 65 Q18 45 45 40 Q70 38 100 55"
          fill="none"
          stroke="hsl(270 50% 75%)"
          strokeWidth="2"
          strokeLinecap="round"
          custom={0.8}
          variants={drawVariants}
        />
        <motion.path
          d="M100 55 Q130 38 155 40 Q182 45 180 65 Q175 90 145 100 Q120 110 100 140"
          fill="none"
          stroke="hsl(270 50% 75%)"
          strokeWidth="2"
          strokeLinecap="round"
          custom={1.2}
          variants={drawVariants}
        />

        {/* Inner petals */}
        <motion.path
          d="M100 140 Q90 105 75 90 Q55 70 60 45 Q65 25 100 28"
          fill="none"
          stroke="hsl(280 45% 80%)"
          strokeWidth="1.8"
          strokeLinecap="round"
          custom={1.6}
          variants={drawVariants}
        />
        <motion.path
          d="M100 28 Q135 25 140 45 Q145 70 125 90 Q110 105 100 140"
          fill="none"
          stroke="hsl(280 45% 80%)"
          strokeWidth="1.8"
          strokeLinecap="round"
          custom={2}
          variants={drawVariants}
        />

        {/* Innermost petals - delicate details */}
        <motion.path
          d="M100 130 Q92 100 82 85 Q70 65 78 48 Q85 35 100 38"
          fill="none"
          stroke="hsl(285 40% 85%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={2.4}
          variants={drawVariants}
        />
        <motion.path
          d="M100 38 Q115 35 122 48 Q130 65 118 85 Q108 100 100 130"
          fill="none"
          stroke="hsl(285 40% 85%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={2.6}
          variants={drawVariants}
        />

        {/* Center pistil and stamen details */}
        <motion.circle
          cx="100"
          cy="80"
          r="12"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          custom={3}
          variants={drawVariants}
        />
        <motion.circle
          cx="100"
          cy="80"
          r="6"
          fill="none"
          stroke="hsl(270 55% 65%)"
          strokeWidth="1"
          custom={3.2}
          variants={drawVariants}
        />
        
        {/* Small dots around center */}
        <motion.circle
          cx="92"
          cy="75"
          r="2"
          fill="hsl(var(--primary))"
          custom={3.4}
          variants={drawVariants}
        />
        <motion.circle
          cx="108"
          cy="75"
          r="2"
          fill="hsl(var(--primary))"
          custom={3.5}
          variants={drawVariants}
        />
        <motion.circle
          cx="100"
          cy="88"
          r="2"
          fill="hsl(var(--primary))"
          custom={3.6}
          variants={drawVariants}
        />

        {/* Stem with curve */}
        <motion.path
          d="M100 140 C100 155 98 170 96 185"
          fill="none"
          stroke="hsl(120 30% 40%)"
          strokeWidth="3"
          strokeLinecap="round"
          custom={3.8}
          variants={drawVariants}
        />

        {/* Leaves on stem */}
        <motion.path
          d="M98 150 Q82 145 75 155 Q72 162 80 165 Q90 160 98 155"
          fill="none"
          stroke="hsl(120 30% 45%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={4.2}
          variants={drawVariants}
        />
        <motion.path
          d="M97 165 Q115 160 122 168 Q126 175 118 178 Q108 175 97 170"
          fill="none"
          stroke="hsl(120 30% 45%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={4.5}
          variants={drawVariants}
        />

        {/* Delicate vein details on leaves */}
        <motion.path
          d="M85 155 Q80 158 78 162"
          fill="none"
          stroke="hsl(120 25% 50%)"
          strokeWidth="1"
          strokeLinecap="round"
          custom={4.6}
          variants={drawVariants}
        />
        <motion.path
          d="M112 168 Q118 171 120 175"
          fill="none"
          stroke="hsl(120 25% 50%)"
          strokeWidth="1"
          strokeLinecap="round"
          custom={4.7}
          variants={drawVariants}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedLily;
