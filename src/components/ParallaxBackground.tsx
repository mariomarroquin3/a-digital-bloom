import { motion, useScroll, useTransform } from "framer-motion";
import lilyBackground from "@/assets/lily-background.jpg";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // Multiple parallax layers for depth
  const bgY = useTransform(scrollY, [0, 3000], [0, 800]);
  const midY = useTransform(scrollY, [0, 3000], [0, 500]);
  const fgY = useTransform(scrollY, [0, 3000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 1000], [0.65, 0.25]);
  const scale = useTransform(scrollY, [0, 2000], [1, 1.15]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Deep background layer - slowest */}
      <motion.div
        className="absolute inset-0 w-full h-[150%]"
        style={{ 
          y: bgY,
          scale,
          transformOrigin: "center top",
        }}
      >
        <img
          src={lilyBackground}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "blur(2px)" }}
        />
      </motion.div>

      {/* Mid layer - atmospheric haze */}
      <motion.div
        className="absolute inset-0"
        style={{ y: midY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center 30%, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Foreground gradient layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: fgY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--background) / 0.3) 50%, hsl(var(--background) / 0.6) 100%)",
          }}
        />
      </motion.div>

      {/* Gradient overlay for readability */}
      <motion.div
        className="absolute inset-0 gradient-overlay"
        style={{ opacity }}
      />

      {/* Vignette effect for cinematic feel */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px 80px hsl(var(--background) / 0.4)",
        }}
      />

      {/* Additional soft overlay */}
      <div className="absolute inset-0 bg-background/35" />
    </div>
  );
};

export default ParallaxBackground;
