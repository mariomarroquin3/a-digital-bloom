import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const letterParagraphs = [
  "My Dearest Love,",
  "On this special day, I find myself searching for words grand enough to capture what you mean to me. But perhaps the most honest words are the simplest ones.",
  "You are my sunrise and my favorite song. You are the calm in my chaos and the adventure in my routine. Every moment with you feels like coming home.",
  "I've watched you grow, dream, stumble, and rise again with grace that leaves me breathless. Your strength inspires me. Your kindness humbles me. Your laugh is my favorite sound in any universe.",
  "Today, I celebrate not just the day you were born, but every version of you that has existed since. The child who dreamed big. The person who works hard. The soul who loves deeply.",
  "Thank you for choosing to share your days with me. Thank you for your patience, your warmth, and for being exactly who you are.",
  "May this new year of your life bring you all the magic you deserve—and a little bit more.",
  "Happy Birthday, my love. Today and always, you are celebrated. You are cherished. You are loved beyond measure.",
];

const LetterSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="space-y-8">
              {letterParagraphs.map((paragraph, index) => (
                <LetterParagraph
                  key={index}
                  text={paragraph}
                  delay={index * 0.15}
                  isGreeting={index === 0}
                />
              ))}

              <ScrollReveal delay={letterParagraphs.length * 0.15}>
                <p className="font-display italic text-xl md:text-2xl text-primary text-right mt-12">
                  Forever Yours
                </p>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

interface LetterParagraphProps {
  text: string;
  delay: number;
  isGreeting?: boolean;
}

const LetterParagraph = ({ text, delay, isGreeting }: LetterParagraphProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className={`letter-text ${
        isGreeting
          ? "text-2xl md:text-3xl text-primary font-medium mb-6"
          : "text-lg md:text-xl text-foreground/90"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {text}
    </motion.p>
  );
};

export default LetterSection;
