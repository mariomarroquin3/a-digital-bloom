import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  
  // Parallax transforms for background elements
  const bgY1 = useTransform(scrollY, [0, 500], [0, 150]);
  const bgY2 = useTransform(scrollY, [0, 500], [0, 100]);
  const bgY3 = useTransform(scrollY, [0, 500], [0, 50]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const bgRotate = useTransform(scrollY, [0, 500], [0, 5]);

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center pb-24 overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs with parallax */}
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          style={{ y: bgY1, scale: bgScale }}
        />
        <motion.div
          className="absolute top-40 right-[15%] w-48 h-48 rounded-full bg-accent/15 blur-2xl"
          style={{ y: bgY2, rotate: bgRotate }}
        />
        <motion.div
          className="absolute bottom-40 left-[20%] w-56 h-56 rounded-full bg-primary/8 blur-3xl"
          style={{ y: bgY3 }}
        />
        <motion.div
          className="absolute top-1/3 right-[25%] w-32 h-32 rounded-full bg-muted/20 blur-xl"
          style={{ y: bgY2, scale: bgScale }}
        />
        
        {/* Decorative lines with parallax */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ y: bgY1 }}
        />
        <motion.div
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"
          style={{ y: bgY3 }}
        />
        
        {/* Corner accents */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"
          style={{ y: bgY1, rotate: bgRotate }}
        />
        <motion.div
          className="absolute top-10 right-10 w-24 h-24 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl"
          style={{ y: bgY1, rotate: useTransform(scrollY, [0, 500], [0, -5]) }}
        />
      </div>

      <motion.div
        className="text-center px-6 py-20 relative z-10"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            Happy Birthday
          </h1>

          <motion.div
            className="w-24 h-1 mx-auto rounded-full bg-primary/50 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          <p className="font-display italic text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto">
            A letter written for you
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
