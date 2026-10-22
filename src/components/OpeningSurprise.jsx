import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const OpeningSurprise = ({ onOpenComplete }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenClick = () => {
    setIsOpened(true);

    try {
      // Multistage celebration confetti explosion
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    } catch (err) {
      console.log('Confetti burst', err);
    }

    setTimeout(() => {
      onOpenComplete();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl glass-card-pink relative overflow-hidden border border-pink-500/30 shadow-2xl"
      >
        {/* Floating background sparkles */}
        <div className="absolute top-6 left-6 text-pink-400/40 animate-spin" style={{ animationDuration: '8s' }}>
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-6 right-6 text-purple-400/40 animate-spin" style={{ animationDuration: '10s' }}>
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Text Sequence */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-bold text-sm sm:text-base border border-pink-500/30 tracking-wider">
              WAIT... 👀
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl sm:text-3xl font-semibold text-slate-200 leading-snug"
          >
            Today is the birthday of someone VERY special...
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="text-3xl sm:text-5xl font-black font-display text-gradient-primary tracking-tight"
          >
            MY SOULMATE! 🎂✨
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring' }}
            className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 py-2 font-display drop-shadow-md"
          >
            {birthdayData.herName.toUpperCase()} ❤️
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="mt-10 pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            disabled={isOpened}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-display font-black text-lg sm:text-xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-3 mx-auto border border-pink-400/40"
          >
            <Gift className={`w-6 h-6 ${isOpened ? 'animate-bounce' : 'animate-pulse'}`} />
            {isOpened ? "OPENING SURPRISE... 🎉" : "OPEN YOUR SURPRISE 🎁"}
          </motion.button>

          <p className="mt-4 text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 inline" /> Made especially for you. ✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
