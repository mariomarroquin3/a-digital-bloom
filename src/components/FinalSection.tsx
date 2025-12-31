import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Star } from "lucide-react";

const FinalSection = () => {
  const [easterEggFound, setEasterEggFound] = useState(false);

  return (
    <section className="relative z-20 py-40 md:py-56">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star className="w-12 h-12 text-primary" fill="currentColor" />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8">
            Until Next Year
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="font-display italic text-xl md:text-2xl text-muted-foreground mb-12">
            May every day bring you closer to your dreams
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Hidden Easter Egg */}
        <ScrollReveal delay={0.8}>
          <motion.div
            className="mt-24 pt-12 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-500 font-body text-sm"
              onClick={() => setEasterEggFound(true)}
              whileHover={{ scale: 1.05 }}
            >
              {easterEggFound ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary"
                >
                  I wish the best for you
                </motion.span>
              ) : (
                "・・・"
              )}
            </motion.button>
          </motion.div>
        </ScrollReveal>

        {/* Gentle fade to background */}
        <div className="mt-20 h-32 bg-gradient-to-b from-transparent to-background/50" />
      </div>
    </section>
  );
};

export default FinalSection;
