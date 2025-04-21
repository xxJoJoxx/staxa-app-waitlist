import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  colors?: string[][];  // Updated to accept gradient color pairs
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  colors,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  // Find the maximum width of all words
  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      let maxWordWidth = 0;
      
      // Find the width of the longest word
      for (let i = 0; i < elements.length; i++) {
        const width = elements[i].getBoundingClientRect().width;
        if (width > maxWordWidth) {
          maxWordWidth = width;
        }
      }
      
      // Add a small buffer (10px) to prevent any potential text wrapping
      setMaxWidth(`${maxWordWidth + 10}px`);
    }
  }, [words]); // Only recalculate when words array changes

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Container animation for the whole word
  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  // Create gradient style based on colors
  const getGradientStyle = (index: number) => {
    if (!colors || !colors[index]) {
      return { color: undefined };
    }
    
    // For single color (backward compatibility)
    if (typeof colors[index] === 'string') {
      return { color: colors[index] };
    }
    
    // For gradient colors
    const colorPair = colors[index];
    if (Array.isArray(colorPair) && colorPair.length >= 2) {
      return { 
        background: `linear-gradient(90deg, ${colorPair[0]} 0%, ${colorPair[1]} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent'
      };
    }
    
    return { color: undefined };
  };

  return (
    <>
      {/* Hidden measurement div with all words rendered */}
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word */}
      <motion.span 
        className="relative inline-block"
        style={{ width: maxWidth }} // Use fixed max width for all words
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              whiteSpace: "nowrap", 
              ...getGradientStyle(currentIndex)
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
} 