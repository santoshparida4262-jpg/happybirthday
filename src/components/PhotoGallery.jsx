import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { SmartImage } from './SmartImage';

export const PhotoGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const photos = birthdayData.photos || [];

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Prevent background page scrolling when photo lightbox modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  return (
    <section id="memories" className="py-20 pb-28 px-4 max-w-6xl mx-auto relative z-10 w-full isolate">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold text-xs sm:text-sm"
        >
          <Camera className="w-4 h-4 text-pink-400" />
          <span>Memory Lane</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight"
        >
          Unforgettable Memories With My Soulmate 📸❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto"
        >
          A collection of unforgettable moments, sweet laughs, and our favorite memories together. Click any photo to view!
        </motion.p>
      </div>

      {/* Responsive Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start mb-8">
        {photos.map((photo, index) => {
          // Subtle random rotation angle for Polaroid feel
          const rotationAngle = (index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -1);

          return (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotationAngle }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 20 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`cursor-pointer group ${index === photos.length - 1 ? 'lg:col-start-2' : ''}`}
            >
              <div className="p-3 sm:p-4 rounded-3xl glass-card-pink border border-white/10 hover:border-pink-500/40 shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Photo Frame */}
                <div className="rounded-2xl overflow-hidden shadow-md relative">
                  <SmartImage
                    src={photo.image}
                    alt={photo.caption}
                    placeholderText={`Memory #${index + 1}`}
                    fallbackAccent={photo.accent}
                    aspectRatio={index % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}
                    className="group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Tag Pill */}
                  {photo.tag && (
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-pink-300 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-pink-500/30">
                      {photo.tag}
                    </div>
                  )}

                  {/* Zoom Overlay Icon */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-pink-500/80 text-white shadow-lg backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Photo Caption */}
                <div className="pt-3 pb-1 px-1 flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-pink-300 transition-colors line-clamp-2">
                    "{photo.caption}"
                  </p>
                  <Sparkles className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal (Portaled to root document body to isolate z-index and click events) */}
      {selectedPhotoIndex !== null && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-3xl w-full max-h-[90vh] glass-card-pink rounded-3xl p-4 sm:p-6 border border-pink-500/40 shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedPhotoIndex(null);
                }}
                className="absolute top-4 right-4 z-[10000] p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-pink-500 transition-all border border-white/10 pointer-events-auto cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-pink-500 transition-all border border-white/10 hidden sm:flex items-center justify-center"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-pink-500 transition-all border border-white/10 hidden sm:flex items-center justify-center"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Lightbox Image */}
              <div className="w-full max-h-[65vh] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-900/50">
                <SmartImage
                  src={photos[selectedPhotoIndex].image}
                  alt={photos[selectedPhotoIndex].caption}
                  placeholderText={`Memory #${selectedPhotoIndex + 1}`}
                  fallbackAccent={photos[selectedPhotoIndex].accent}
                  aspectRatio="aspect-auto"
                  className="max-h-[65vh] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Lightbox Caption & Info */}
              <div className="w-full pt-4 text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs text-pink-300 font-semibold px-3 py-1 rounded-full bg-pink-500/20">
                  <Sparkles className="w-3.5 h-3.5" /> Memory {selectedPhotoIndex + 1} of {photos.length}
                </div>
                <h3 className="text-base sm:text-xl font-bold font-display text-white">
                  "{photos[selectedPhotoIndex].caption}"
                </h3>
              </div>

              {/* Mobile Prev/Next Controls */}
              <div className="flex sm:hidden items-center justify-between w-full pt-3 border-t border-white/10 mt-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
