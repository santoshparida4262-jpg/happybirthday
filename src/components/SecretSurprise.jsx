import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, X } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { SmartImage } from './SmartImage';

export const SecretSurprise = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const { teaserTitle, buttonText, sequentialMessages } = birthdayData.secretSurprise;
  const photos = birthdayData.photos || [];
  const totalPhotos = photos.length;

  const timerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  // Clear all pending timers safely
  const clearAllTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
  };

  // Prevent background page scrolling when slideshow modal is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  // Handle slideshow progression & dynamic auto-close on last photo
  useEffect(() => {
    if (!isActive) return;

    // Check if we are on the LAST photo/step
    const isLastPhoto = currentStep >= totalPhotos - 1;

    if (isLastPhoto) {
      // Trigger final celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24', '#f43f5e']
        });
      } catch (err) {
        console.log('Confetti burst', err);
      }

      // Wait 1.8 seconds on the last photo, then start fade out
      timerRef.current = setTimeout(() => {
        setIsFadingOut(true);

        // After 600ms fade-out transition, close overlay and scroll to final section
        fadeTimerRef.current = setTimeout(() => {
          setIsActive(false);
          setIsFadingOut(false);
          setCurrentStep(0);

          // Smoothly scroll down to the final birthday section
          const endingElement = document.querySelector('#ending');
          if (endingElement) {
            endingElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 600);
      }, 1800);
    } else {
      // Normal progression to next photo
      const currentMessage = sequentialMessages[currentStep % sequentialMessages.length];
      const stepDuration = currentMessage?.delay || 2200;

      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, stepDuration);
    }

    return () => clearAllTimers();
  }, [isActive, currentStep, totalPhotos, sequentialMessages]);

  const handleStart = () => {
    clearAllTimers();
    setIsFadingOut(false);
    setCurrentStep(0);
    setIsActive(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti', err);
    }
  };

  const handleClose = () => {
    clearAllTimers();
    setIsFadingOut(false);
    setIsActive(false);
    setCurrentStep(0);
  };

  const currentPhoto = photos[currentStep % totalPhotos] || photos[0];
  const currentMessage = sequentialMessages[currentStep % sequentialMessages.length] || sequentialMessages[0];
  const isLastStep = currentStep >= totalPhotos - 1;

  return (
    <section id="surprise" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 text-center">
      <div className="glass-card-purple rounded-3xl p-8 sm:p-12 border border-purple-500/30 shadow-2xl relative overflow-hidden space-y-6">
        {/* Ambient glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-bold text-xs sm:text-sm border border-pink-500/30">
            <Gift className="w-4 h-4 text-pink-400" /> Secret Vault
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            {teaserTitle}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            A special visual surprise sequence made just for you. Sit back and enjoy the memories!
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div className="pt-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-display font-black text-lg sm:text-2xl shadow-2xl shadow-pink-500/40 hover:shadow-pink-500/60 transition-all border border-pink-300/40 flex items-center justify-center gap-3 mx-auto group animate-pulse-glow"
          >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300 group-hover:rotate-12 transition-transform" />
            <span>{buttonText}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen Slideshow Modal (Portaled to root document body to isolate z-index and click events) */}
      {isActive && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          >
            {/* Manual Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-pink-500 transition-all border border-white/10 pointer-events-auto cursor-pointer"
              aria-label="Close slideshow"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Glowing Background Halos */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse-glow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Main Cinema Content Container (Normal Flex Stack, No Absolute Overlaps) */}
            <div className="max-w-xl w-full text-center flex flex-col items-center gap-6 sm:gap-8 relative z-10">
              
              {/* Photo Frame */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.5 }}
                  className="relative max-w-xs sm:max-w-sm w-full mx-auto"
                >
                  <div className="p-3 rounded-3xl glass-card-pink border border-pink-500/40 shadow-2xl overflow-hidden">
                    <SmartImage
                      src={currentPhoto.image}
                      alt={currentPhoto.caption}
                      placeholderText={`Eva's Photo #${currentStep + 1}`}
                      fallbackAccent={currentPhoto.accent}
                      aspectRatio="aspect-[4/5]"
                      className="rounded-2xl shadow-lg"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sequential Text Message & Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3 px-2"
                >
                  <h3 className={`font-display font-black tracking-tight leading-snug ${
                    isLastStep
                      ? 'text-3xl sm:text-4xl text-gradient-primary drop-shadow-lg'
                      : currentMessage?.highlight
                      ? 'text-2xl sm:text-3xl text-pink-300'
                      : 'text-xl sm:text-2xl text-slate-100'
                  }`}>
                    {isLastStep ? "HAPPY BIRTHDAY, EVA! 🎂🥳❤️" : currentMessage?.text}
                  </h3>

                  {isLastStep && (
                    <p className="text-sm sm:text-base text-pink-200 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                      <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" /> And that's just a few of our memories... ❤️
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step Dots Progress Indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                {Array.from({ length: totalPhotos }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === currentStep
                        ? 'w-8 bg-pink-500 shadow-md shadow-pink-500/50'
                        : i < currentStep
                        ? 'w-2 bg-purple-500/60'
                        : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
