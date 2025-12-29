import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import PasswordGate from "@/components/PasswordGate";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingPetals from "@/components/FloatingPetals";
import HeroSection from "@/components/HeroSection";
import FromToSection from "@/components/FromToSection";
import LetterSection from "@/components/LetterSection";
import PhotoSection from "@/components/PhotoSection";
import ChocolateSection from "@/components/ChocolateSection";
import FinalSection from "@/components/FinalSection";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Change this password to your secret word
  const secretPassword = "love";

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Password Gate */}
      <AnimatePresence>
        {!isUnlocked && (
          <PasswordGate
            onSuccess={() => setIsUnlocked(true)}
            correctPassword={secretPassword}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Parallax Background */}
            <ParallaxBackground />

            {/* Floating Petals */}
            <FloatingPetals />

            {/* Content Sections */}
            <main className="relative z-10">
              <HeroSection />
              <FromToSection />
              <LetterSection />
              <PhotoSection />
              <ChocolateSection />
              <FinalSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
