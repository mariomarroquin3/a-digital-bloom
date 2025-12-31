import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const sweetMessages = [
  { text: "Here is the first...", emoji: "🍫" },
  { text: "second...", emoji: "🍫" },
  { text: "third...", emoji: "🍫" },
  { text: "aand fourth.", emoji: "🍫" },
];

const ChocolateSection = () => {
  return (
    <section className="relative z-20 py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-6">
            Some chocolates for you
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-16 max-w-xl mx-auto">
            These are the  chocolates I owe you, hopefully they sweeten your day!
          </p>
        </ScrollReveal>

        {/* Chocolate box grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {sweetMessages.map((message, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="scale">
              <motion.div
                className="aspect-square glass-card rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: "0 20px 40px hsl(270 50% 50% / 0.2)" 
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Chocolate shape decoration */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/40 flex items-center justify-center mb-4 shadow-soft"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl md:text-3xl">{message.emoji}</span>
                </motion.div>

                <p className="font-display text-sm md:text-base text-foreground/90 group-hover:text-primary transition-colors duration-300">
                  {message.text}
                </p>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(45deg, transparent 30%, hsl(270 55% 70% / 0.1) 50%, transparent 70%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative ribbon */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ChocolateSection;
