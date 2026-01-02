import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import AnimatedLily from "./AnimatedLily";

interface PasswordGateProps {
  onSuccess: () => void;
  correctPassword: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const PasswordGate = ({ onSuccess, correctPassword }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate floating light particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsExiting(true);
      setTimeout(onSuccess, 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center gradient-hero overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Parallax Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Deep layer - moves slowest */}
            <motion.div
              className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-primary/10 blur-3xl"
              animate={{
                x: mousePosition.x * -30,
                y: mousePosition.y * -30,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
            />
            <motion.div
              className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full bg-accent/15 blur-3xl"
              animate={{
                x: mousePosition.x * -25,
                y: mousePosition.y * -25,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
            />
            
            {/* Mid layer - medium speed */}
            <motion.div
              className="absolute top-1/4 right-[20%] w-48 h-48 rounded-full bg-primary/8 blur-2xl"
              animate={{
                x: mousePosition.x * -50,
                y: mousePosition.y * -50,
              }}
              transition={{ type: "spring", stiffness: 75, damping: 25 }}
            />
            <motion.div
              className="absolute bottom-1/3 left-[15%] w-40 h-40 rounded-full bg-muted/20 blur-2xl"
              animate={{
                x: mousePosition.x * -45,
                y: mousePosition.y * -45,
              }}
              transition={{ type: "spring", stiffness: 75, damping: 25 }}
            />
            
            {/* Foreground layer - moves fastest */}
            <motion.div
              className="absolute top-1/3 left-[30%] w-24 h-24 rounded-full bg-primary/15 blur-xl"
              animate={{
                x: mousePosition.x * -80,
                y: mousePosition.y * -80,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            <motion.div
              className="absolute bottom-1/4 right-[25%] w-20 h-20 rounded-full bg-accent/20 blur-xl"
              animate={{
                x: mousePosition.x * -70,
                y: mousePosition.y * -70,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            
            {/* Decorative lines with parallax */}
            <motion.div
              className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{
                y: mousePosition.y * -20,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
            />
            <motion.div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"
              animate={{
                y: mousePosition.y * -15,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
            />
            
            {/* Corner accents with parallax */}
            <motion.div
              className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl"
              animate={{
                x: mousePosition.x * -40,
                y: mousePosition.y * -40,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
            />
            <motion.div
              className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/20 rounded-tr-2xl"
              animate={{
                x: mousePosition.x * -40,
                y: mousePosition.y * -40,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/20 rounded-bl-2xl"
              animate={{
                x: mousePosition.x * -40,
                y: mousePosition.y * -40,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-2xl"
              animate={{
                x: mousePosition.x * -40,
                y: mousePosition.y * -40,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
            />
          </div>

          {/* Floating light particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/40"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [-20, -60, -20],
                  x: [0, Math.random() * 30 - 15, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Soft animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 120 + i * 60,
                  height: 120 + i * 60,
                  left: `${15 + i * 18}%`,
                  top: `${8 + i * 16}%`,
                  background: `radial-gradient(circle, hsl(var(--primary) / ${0.15 - i * 0.02}) 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
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
              {/* Animated Lily Drawing with enhanced glow */}
              <motion.div
                className="inline-flex items-center justify-center mb-8"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <AnimatedLily isComplete={isExiting} />
              </motion.div>

              {/* Sparkle decoration */}
              <motion.div
                className="flex justify-center gap-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Sparkles className="w-4 h-4 text-primary/50" />
                <Sparkles className="w-3 h-3 text-primary/30" />
                <Sparkles className="w-4 h-4 text-primary/50" />
              </motion.div>
              
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                A Gift Awaits
              </h1>
              <p className="text-muted-foreground font-body text-lg">
                Enter my favorite color to unwrap your surprise
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
                  Not quite, try again, come on...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : (
        /* Success bloom animation */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordGate;
