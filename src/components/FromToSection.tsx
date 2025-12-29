import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Heart, Sparkles } from "lucide-react";

const FromToSection = () => {
  return (
    <section className="relative z-20 py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* From Card */}
          <ScrollReveal direction="right" delay={0}>
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10 w-full md:w-72 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary/70" />
              </div>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-widest mb-3">
                From
              </p>
              <p className="font-display text-2xl md:text-3xl text-foreground">
                Someone Who Loves You
              </p>
              <div className="mt-4 h-px w-16 mx-auto bg-primary/30" />
            </motion.div>
          </ScrollReveal>

          {/* Heart connector */}
          <ScrollReveal delay={0.3}>
            <motion.div
              className="hidden md:flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-primary" fill="currentColor" />
            </motion.div>
          </ScrollReveal>

          {/* To Card */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10 w-full md:w-72 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary/70" />
              </div>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-widest mb-3">
                To
              </p>
              <p className="font-display text-2xl md:text-3xl text-foreground">
                The Most Beautiful Soul
              </p>
              <div className="mt-4 h-px w-16 mx-auto bg-primary/30" />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FromToSection;
