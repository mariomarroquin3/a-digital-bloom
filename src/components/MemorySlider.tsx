import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MemorySlide {
  id: number;
  date: string;
  caption: string;
  image: string;
}

const memories: MemorySlide[] = [
  { id: 1, date: "January 2024", caption: "The day we first met", image: "/images/img1.jpeg" },
  { id: 2, date: "March 2024", caption: "Our first adventure together", image: "/images/img2.jpeg" },
  { id: 3, date: "May 2024", caption: "When you made me laugh until I cried", image: "/images/img3.jpeg" },
  { id: 4, date: "July 2024", caption: "That sunset we'll never forget", image: "/images/img4.jpeg" },
  { id: 5, date: "September 2024", caption: "Dancing in the rain", image: "/images/img5.jpeg" },
  { id: 6, date: "December 2024", caption: "Building our dreams together", image: "/images/img6.jpeg" },
  { id: 7, date: "February 2025", caption: "A moment of pure joy", image: "/images/img7.jpeg" },
  { id: 8, date: "April 2025", caption: "Forever grateful for you", image: "/images/img8.jpeg" },
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
            Some good memories
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
                  {/* Image layer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      y: backgroundY,
                      transform: "translateZ(-30px) scale(1.15)",
                    }}
                  >
                    <img 
                      src={memory.image} 
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Midground overlay - medium parallax */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      y: midgroundY,
                      transform: "translateZ(-15px) scale(1.08)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/5 to-transparent opacity-40" />
                  </motion.div>

                  {/* Foreground layer - for depth effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      y: foregroundY,
                      transform: "translateZ(0px)",
                    }}
                  />

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
