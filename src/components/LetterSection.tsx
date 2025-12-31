import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import PlayfulNote, { DoNotClickButton } from "./PlayfulNote";

const letterParagraphs = [
  "Dear my friend,",
  "On your birthday, I wanted to give you something meaningful. Even if I can’t hand you a physical gift, this is my way of being there for you in the best way I know how.",
  "I’m sorry I can’t be with you today, but I hope this little space on the internet can carry my congratulations and remind you that you’re not alone, not today and not ever.",
  "You are an incredible person and an even better friend. Even tough you often get mad at me, sometimes I don’t understand why, but I promise I’ll keep trying to make it right.",
  "I vouch for a good year, a year full of smiles, gossiping, joking, chocolates, parrots, and everything else.",
  "Thank you for being such a good friend to me, for the conversations, the laughs, and for simply being you, also when you give me advice or when you want chocolate (which happens all the time).",
  "I hope this new year brings you happiness, peace, and many reasons to smile. You deserve all the good that’s coming your way.",
  "Happy Birthday. This is my gift to you, made with a lot of care and affection."
];

const LetterSection = () => {
  return (
    <section className="relative z-20 py-32 md:py-44">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="space-y-8">
              {letterParagraphs.slice(0, 4).map((paragraph, index) => (
                <LetterParagraph
                  key={index}
                  text={paragraph}
                  delay={index * 0.15}
                  isGreeting={index === 0}
                />
              ))}

              {/* Playful crossed-out note */}
              <PlayfulNote />

              {letterParagraphs.slice(4).map((paragraph, index) => (
                <LetterParagraph
                  key={index + 4}
                  text={paragraph}
                  delay={(index + 4) * 0.15}
                />
              ))}

              <ScrollReveal delay={letterParagraphs.length * 0.15}>
                <p className="font-display italic text-xl md:text-2xl text-primary text-right mt-12">
                  From a friend 
                </p>
              </ScrollReveal>

              {/* Do not click easter egg */}
              <DoNotClickButton />
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
