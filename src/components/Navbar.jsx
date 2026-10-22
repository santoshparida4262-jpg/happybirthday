import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Heart, Award, Camera, Mail, Gift } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero', icon: Sparkles },
    { name: 'Memories', href: '#memories', icon: Camera },
    { name: 'Awards', href: '#awards', icon: Award },
    { name: 'Message', href: '#message', icon: Mail },
    { name: 'Surprise', href: '#surprise', icon: Gift }
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:py-4">
      <div className="max-w-5xl mx-auto glass-nav rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-lg shadow-purple-950/20 border border-white/10">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md shadow-pink-500/30 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-wide">
            {birthdayData.herName}'s Birthday 🎉
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-pink-500/20 transition-all flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-pink-400" />
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:text-white focus:outline-none pointer-events-auto cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-5xl mx-auto glass-card-pink rounded-2xl p-4 border border-pink-500/30 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-pink-500/20 hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4 text-pink-400" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
