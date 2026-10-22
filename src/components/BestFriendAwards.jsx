import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const BestFriendAwards = () => {
  const awards = birthdayData.awards || [];

  return (
    <section id="awards" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Official Hall of Fame</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight"
        >
          🏆 EVA'S SOULMATE AWARDS 🏆
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto"
        >
          After thorough scientific evaluation, you have officially won the following prestigious titles!
        </motion.p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card-purple rounded-3xl p-6 sm:p-7 border border-purple-500/30 shadow-xl hover:shadow-purple-500/25 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div 
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: award.glowColor || 'rgba(168, 85, 247, 0.3)' }}
            />

            <div>
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/15 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {award.icon}
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" /> {award.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-pink-300 transition-colors">
                {award.title}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-slate-300 text-sm font-medium leading-relaxed mb-4">
                "{award.subtitle}"
              </p>
            </div>

            {/* Bottom ribbon */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-slate-300">
                <Award className="w-4 h-4 text-pink-400" /> Awarded to Eva
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
