import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, AlertCircle, KeyRound, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const BirthdayLock = ({ onUnlock }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Auto focus first input box on mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  // Handle single digit input
  const handleChange = (index, value) => {
    // Only accept numeric digits
    if (value && !/^[0-9]$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setErrorMsg('');

    // Move to next input box if value entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle keydown for backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        // Move to previous box if current box is empty
        inputRefs[index - 1].current?.focus();
      } else {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    }
  };

  // Handle pasting full PIN
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setPin(digits);
      setErrorMsg('');
      inputRefs[3].current?.focus();
    }
  };

  const handleValidation = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    const enteredPin = pin.join('');

    if (enteredPin.length < 4) {
      setErrorMsg("Please enter all 4 digits!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (enteredPin === birthdayData.pin) {
      setIsUnlocked(true);

      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24', '#f43f5e']
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#ec4899', '#a855f7', '#3b82f6']
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#ec4899', '#a855f7', '#3b82f6']
          });
        }, 250);
      } catch (err) {
        console.log('Confetti burst', err);
      }

      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setErrorMsg("Hmm... That's not it! 👀 Try again.");
      setIsShaking(true);
      setPin(['', '', '', '']);
      setTimeout(() => {
        setIsShaking(false);
        inputRefs[0].current?.focus();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-y-auto"
      >
        {/* Soft background light Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[110px] pointer-events-none"></div>

        {/* Lock Screen Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card-pink relative overflow-hidden transition-all duration-300 ${
            isShaking ? 'animate-shake border-red-500/60 shadow-red-500/30' : ''
          } ${isUnlocked ? 'scale-105 border-emerald-400/60 shadow-emerald-500/40' : ''}`}
        >
          {/* Glowing Top Pill */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full border transition-all duration-500 ${
              isUnlocked 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 border-green-300 shadow-lg shadow-green-500/40 scale-110' 
                : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 shadow-inner'
            }`}>
              {isUnlocked ? (
                <Unlock className="w-8 h-8 text-white animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 text-pink-300" />
              )}
            </div>
          </div>

          <div className="text-center space-y-3 mb-6">
            <motion.h2 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide flex items-center justify-center gap-2"
            >
              Hey Eva... <span className="animate-pulse">👀</span>
            </motion.h2>
            
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Before you enter, I need to make sure this surprise is actually for you. 😌
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleValidation} className="space-y-6">
            <div className="text-center">
              <label className="block text-sm font-bold text-pink-200 mb-4 flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4 text-pink-400" /> Enter the secret PIN 🔐
              </label>

              {/* 4 Individual PIN Input Boxes */}
              <div className="flex justify-center items-center gap-3 sm:gap-4" onPaste={handlePaste}>
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-13 h-15 sm:w-16 sm:h-20 rounded-2xl bg-slate-900/80 border text-center text-2xl sm:text-3xl font-bold text-white transition-all duration-300 focus:outline-none ${
                      digit 
                        ? 'border-pink-400 bg-pink-500/10 shadow-lg shadow-pink-500/20' 
                        : 'border-pink-500/30 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-center"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Unlock Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUnlocked}
              className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-base sm:text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isUnlocked
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-pink-500/30 hover:brightness-110 active:scale-95'
              }`}
            >
              {isUnlocked ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" /> Unlocking Surprise...
                </>
              ) : (
                <>
                  Unlock My Surprise 🔓
                </>
              )}
            </motion.button>
          </form>

          {/* Bottom subtle message */}
          <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> Made with all my love for my soulmate, Eva ✨
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
