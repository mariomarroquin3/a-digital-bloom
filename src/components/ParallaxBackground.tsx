import { motion, useScroll, useTransform } from "framer-motion";
import lilyBackground from "@/assets/lily-background.jpg";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, 600]);
  const opacity = useTransform(scrollY, [0, 1000], [0.6, 0.3]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Lily background with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[130%]"
        style={{ y }}
      >
        <img
          src={lilyBackground}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay for readability */}
      <motion.div
        className="absolute inset-0 gradient-overlay"
        style={{ opacity }}
      />

      {/* Additional soft overlay */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default ParallaxBackground;
