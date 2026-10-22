import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const FriendshipLetter = () => {
  const { title, paragraphs } = birthdayData.letter;

  return (
    <section id="message" className="py-20 px-4 max-w-4xl mx-auto relative z-10">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-xs sm:text-sm"
        >
          <MailOpen className="w-4 h-4 text-rose-400" />
          <span>From The Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-snug"
        >
          {title}
        </motion.h2>
      </div>

      {/* Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Soft Background Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl"></div>

        <div className="relative glass-card-pink rounded-3xl p-6 sm:p-12 border border-pink-500/30 shadow-2xl space-y-6 text-slate-100 font-sans leading-relaxed">
          {/* Top Stamp Decorative element */}
          <div className="flex items-center justify-between pb-6 border-b border-pink-500/20">
            <div className="flex items-center gap-2 text-pink-300 font-display font-bold text-sm sm:text-base">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
              <span>A Personal Letter for Eva</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              October 26 ✨
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-slate-200">
            {paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`whitespace-pre-line ${
                  idx === 0
                    ? 'text-xl sm:text-2xl font-bold text-pink-300 font-display'
                    : idx === paragraphs.length - 1
                    ? 'text-xl sm:text-2xl font-black text-gradient-primary font-display pt-3'
                    : 'text-slate-200'
                }`}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Bottom Ribbon */}
          <div className="pt-6 border-t border-pink-500/20 flex items-center justify-between text-xs text-pink-300 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-300" /> Soulmates Forever
            </span>
            <span className="text-slate-400">With All My Love ❤️</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
