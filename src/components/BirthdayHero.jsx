import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { SmartImage } from './SmartImage';

export const BirthdayHero = () => {
  const heroPhoto = birthdayData.photos[0] || { image: './images/eva1.jpg', caption: "Eva's Best Photo" };

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10">
      {/* Subtle Background Emojis (pointer-events-none & z-0) */}
      <div className="absolute top-28 left-[8%] text-3xl sm:text-4xl animate-float pointer-events-none opacity-40 z-0">🎈</div>
      <div className="absolute top-36 right-[8%] text-3xl sm:text-4xl animate-float-slow pointer-events-none opacity-40 z-0" style={{ animationDelay: '1s' }}>🎂</div>
      <div className="absolute bottom-32 left-[12%] text-2xl sm:text-3xl animate-float pointer-events-none opacity-40 z-0" style={{ animationDelay: '2s' }}>✨</div>
      <div className="absolute bottom-36 right-[12%] text-3xl sm:text-4xl animate-float-slow pointer-events-none opacity-40 z-0" style={{ animationDelay: '3s' }}>🎉</div>

      {/* Main Hero Container */}
      <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center gap-6 sm:gap-8 relative z-10">
        
        {/* 1. Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-semibold text-xs sm:text-sm backdrop-blur-md shadow-inner"
        >
          <PartyPopper className="w-4 h-4 text-pink-400" />
          <span>Celebrating My Soulmate</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        </motion.div>

        {/* 2. Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-tight"
        >
          Happy Birthday,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 drop-shadow-md">
            {birthdayData.herName}! 🎂🥳
          </span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 font-medium max-w-xl mx-auto whitespace-pre-line leading-relaxed"
        >
          {birthdayData.heroSubtitle}
        </motion.p>

        {/* 4. Eva's Photo Container (Distinct Block, No Overlap) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-xs sm:max-w-sm w-full mx-auto my-2"
        >
          {/* Subtle Glow Ring */}
          <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50 blur-lg animate-pulse-glow"></div>

          <div className="relative rounded-3xl p-2.5 bg-slate-950/80 border border-white/20 shadow-2xl backdrop-blur-xl group overflow-hidden">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-pink-500/20">
              <SmartImage
                src={heroPhoto.image}
                alt={`${birthdayData.herName}'s photo`}
                placeholderText={`${birthdayData.herName}'s Birthday Photo`}
                aspectRatio="aspect-[4/5]"
                fallbackAccent="from-pink-500 via-purple-600 to-indigo-600"
                className="group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Sparkles Badge Overlay */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-pink-400/40 text-pink-300 text-xs font-bold flex items-center gap-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Birthday Queen
            </div>

            {/* Caption Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-center shadow-md">
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                "{heroPhoto.caption}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* 5. CTA Button Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 pt-2"
        >
          <h3 className="text-xl sm:text-2xl font-bold font-display text-gradient-sparkle flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" /> Today is all about YOU! ✨
          </h3>

          <a
            href="#memories"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#memories')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-white font-display font-bold text-base border border-pink-500/40 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>See Our Memories</span>
            <ChevronDown className="w-5 h-5 text-pink-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
