import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";

interface PasswordGateProps {
  onSuccess: () => void;
  correctPassword: string;
}

const PasswordGate = ({ onSuccess, correctPassword }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsExiting(true);
      setTimeout(onSuccess, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center gradient-hero"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 18}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 w-full max-w-md mx-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-10 h-10 text-primary" fill="currentColor" />
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                A Gift Awaits
              </h1>
              <p className="text-muted-foreground font-body text-lg">
                Enter the secret word to unwrap your surprise
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Whisper the magic word..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-body text-lg"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-body font-medium text-lg shadow-soft hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Open My Gift
              </motion.button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="mt-6 text-center text-muted-foreground font-body text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Not quite, my love. Try again with your heart 💜
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordGate;
