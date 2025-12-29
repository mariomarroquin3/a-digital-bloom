import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingPetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.5,
            opacity: petal.opacity,
          }}
          initial={{ y: -50, rotate: 0, x: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            x: [0, 50, -30, 70, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
