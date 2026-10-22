import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Rocket, Cake } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { SmartImage } from './SmartImage';

export const BirthdayEnding = () => {
  const endingPhoto = birthdayData.photos[0] || { image: './images/eva1.jpg', caption: 'Eva' };
  const { title, name, quoteLines, cheers, closing, footerText } = birthdayData.ending;

  // Continuous subtle background confetti
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        confetti({
          particleCount: 12,
          startVelocity: 15,
          spread: 80,
          ticks: 100,
          origin: { x: Math.random(), y: 0 }
        });
      } catch (e) {
        // ignore
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ending" className="py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center relative z-10 w-full isolate text-center">
      {/* Background ambient glow halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-gradient-to-tr from-pink-500/15 via-purple-500/15 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Main Container — Vertical Flex Stack */}
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center gap-6 sm:gap-8 relative z-10">
        
        {/* 1. Title Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-bold text-sm sm:text-base shadow-lg backdrop-blur-md"
        >
          <Cake className="w-5 h-5 text-pink-400" />
          <span>{title}</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.div>

        {/* 2. Big Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 tracking-tight leading-none drop-shadow-xl"
        >
          {name}
        </motion.h1>

        {/* 3. Featured Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xs sm:max-w-sm w-full mx-auto my-2"
        >
          <div className="p-3 rounded-3xl glass-card-pink border border-pink-400/40 shadow-2xl overflow-hidden group">
            <SmartImage
              src={endingPhoto.image}
              alt={`${name}'s photo`}
              placeholderText={`${name}'s Final Birthday Frame`}
              aspectRatio="aspect-[4/5]"
              fallbackAccent="from-pink-500 to-indigo-600"
              className="rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* 4. Quote Lines Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-2 text-base sm:text-lg text-slate-200 font-medium max-w-xl mx-auto leading-relaxed"
        >
          {quoteLines.map((line, idx) => (
            <p key={idx} className={idx === quoteLines.length - 1 ? "text-pink-300 font-bold text-lg sm:text-xl" : ""}>
              {line}
            </p>
          ))}
        </motion.div>

        {/* 5. Cheers Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 text-sm sm:text-base font-semibold max-w-lg mx-auto leading-relaxed"
        >
          {cheers}
        </motion.p>

        {/* 6. Closing Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-4xl font-extrabold font-display text-gradient-sparkle"
        >
          {closing}
        </motion.h2>

        {/* 7. Bottom Rocket Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-6 border-t border-white/10 w-full flex justify-center"
        >
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-400 bg-slate-900/60 px-6 py-2.5 rounded-full border border-white/10 shadow-inner">
            <Rocket className="w-4 h-4 text-pink-400 animate-bounce shrink-0" />
            <span>{footerText}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
