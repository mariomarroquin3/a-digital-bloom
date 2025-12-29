import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ImageIcon, X } from "lucide-react";

interface PhotoCardProps {
  index: number;
  caption: string;
  imageUrl?: string;
}

const PhotoCard = ({ index, caption, imageUrl }: PhotoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative cursor-pointer group"
        whileHover={{ rotate: index % 2 === 0 ? 2 : -2, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="glass-card rounded-lg p-3 md:p-4 shadow-card">
          {/* Photo area */}
          <div className="aspect-[4/5] rounded-md overflow-hidden bg-muted/50 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={caption}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm font-body">Your Photo Here</span>
              </div>
            )}
          </div>

          {/* Caption */}
          <p className="mt-4 text-center font-display text-lg text-foreground/80 italic">
            {caption}
          </p>
        </div>

        {/* Tape decoration */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary/20 rounded-sm rotate-1" />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full glass-card"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.button>

            <motion.div
              className="max-w-2xl w-full glass-card rounded-2xl p-4 md:p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-20 h-20 mb-4 opacity-50" />
                    <span className="text-lg font-body">Add Your Special Photo</span>
                  </div>
                )}
              </div>
              <p className="mt-6 text-center font-display text-xl text-foreground italic">
                {caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PhotoSection = () => {
  const photos = [
    { caption: "A moment frozen in time" },
    { caption: "Where magic happens" },
  ];

  return (
    <section className="relative z-20 py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-16">
            Captured Memories
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {photos.map((photo, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.2}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <PhotoCard index={index} caption={photo.caption} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSection;
