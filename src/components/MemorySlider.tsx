import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MemorySlide {
  id: number;
  date: string;
  caption: string;
  placeholder: string;
}

const memories: MemorySlide[] = [
  { id: 1, date: "January 2024", caption: "The day we first met", placeholder: "Memory 1" },
  { id: 2, date: "March 2024", caption: "Our first adventure together", placeholder: "Memory 2" },
  { id: 3, date: "May 2024", caption: "When you made me laugh until I cried", placeholder: "Memory 3" },
  { id: 4, date: "July 2024", caption: "That sunset we'll never forget", placeholder: "Memory 4" },
  { id: 5, date: "September 2024", caption: "Dancing in the rain", placeholder: "Memory 5" },
  { id: 6, date: "December 2024", caption: "Building our dreams together", placeholder: "Memory 6" },
];

const MemorySlider = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === "next" && activeIndex < memories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 py-32 md:py-40 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <ScrollReveal>
        <div className="text-center mb-16 px-6">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Our Memories
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            A timeline of moments that made my heart sing
          </p>
        </div>
      </ScrollReveal>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={() => navigate("prev")}
          disabled={activeIndex === 0}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigate("next")}
          disabled={activeIndex === memories.length - 1}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Container with 3D perspective */}
        <div 
          className="flex items-center justify-center gap-4 md:gap-6 py-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {memories.map((memory, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Calculate 3D transforms for cinematic depth
            const rotateY = offset * 25;
            const translateZ = isActive ? 100 : -80 * Math.abs(offset);
            const translateX = offset * 180;

            return (
              <motion.div
                key={memory.id}
                className="absolute cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{
                  rotateY: rotateY,
                  translateZ: translateZ,
                  translateX: translateX,
                  scale: isActive ? 1 : 0.85 - Math.abs(offset) * 0.05,
                  opacity: isActive ? 1 : 0.6 - Math.abs(offset) * 0.15,
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-2xl shadow-card ${
                    isActive ? "w-72 h-96 md:w-96 md:h-[28rem]" : "w-48 h-64 md:w-64 md:h-80"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={isActive ? { scale: 1.02 } : undefined}
                >
                  {/* Background layer - slowest parallax */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40"
                    style={{
                      y: backgroundY,
                      backgroundSize: "150% 150%",
                      transform: "translateZ(-30px) scale(1.15)",
                    }}
                    animate={{
                      backgroundPosition: isActive
                        ? ["0% 0%", "100% 100%"]
                        : "50% 50%",
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Midground layer - medium parallax */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      y: midgroundY,
                      transform: "translateZ(-15px) scale(1.08)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/10 to-transparent opacity-60" />
                  </motion.div>

                  {/* Foreground layer - fastest parallax */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      y: foregroundY,
                      transform: "translateZ(0px)",
                    }}
                  >
                    <span className="font-display text-lg md:text-xl text-foreground/30">
                      {memory.placeholder}
                    </span>
                  </motion.div>

                  {/* Depth shadow for 3D effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isActive 
                        ? "none" 
                        : `linear-gradient(${offset > 0 ? '90deg' : '-90deg'}, transparent 50%, hsl(var(--background) / 0.3) 100%)`,
                    }}
                  />

                  {/* Overlay with date and caption */}
                  <AnimatePresence>
                    {(hoveredIndex === index || (isActive && hoveredIndex === null)) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex flex-col justify-end p-6"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          className="font-body text-sm text-primary font-medium mb-2"
                        >
                          {memory.date}
                        </motion.p>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          className="font-display text-lg md:text-xl text-foreground"
                        >
                          {memory.caption}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cinematic film grain overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 /%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 /%3E%3C/svg%3E')]" />
                  
                  {/* Cinematic vignette */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    boxShadow: "inset 0 0 60px 20px hsl(var(--background) / 0.2)"
                  }} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Spacer for absolute positioned cards */}
        <div className="h-[28rem] md:h-[32rem]" />

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary w-6"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemorySlider;
