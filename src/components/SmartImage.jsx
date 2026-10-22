import React, { useState } from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

export const SmartImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholderText = "Eva's Memory",
  fallbackAccent = "from-pink-500 to-purple-600",
  aspectRatio = "aspect-square"
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isBlank = !src || hasError;

  // Compute inline CSS aspect-ratio value to prevent height collapse
  const getAspectRatioStyle = (ratioProp) => {
    if (!ratioProp) return "4 / 3";
    if (ratioProp.includes("4/3")) return "4 / 3";
    if (ratioProp.includes("3/4")) return "3 / 4";
    if (ratioProp.includes("4/5")) return "4 / 5";
    if (ratioProp.includes("16/9")) return "16 / 9";
    if (ratioProp.includes("square")) return "1 / 1";
    if (ratioProp.includes("auto")) return "auto";
    return "4 / 3";
  };

  const ratioStyle = getAspectRatioStyle(aspectRatio);

  if (isBlank) {
    const filename = src ? src.split('/').pop() : 'eva1.jpg';
    return (
      <div 
        style={{ aspectRatio: ratioStyle }} 
        className={`relative overflow-hidden bg-slate-900 ${className} w-full`}
      >
        <div className={`w-full h-full bg-gradient-to-br ${fallbackAccent} p-4 sm:p-6 flex flex-col items-center justify-center text-center text-white relative overflow-hidden group`}>
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-pink-300/20 rounded-full blur-xl" />
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg border border-white/30 group-hover:scale-110 transition-transform shrink-0">
            <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <span className="font-display font-bold text-sm sm:text-base text-white drop-shadow-md line-clamp-1 truncate max-w-full">
            {placeholderText}
          </span>
          <span className="text-[11px] sm:text-xs text-white/80 font-medium mt-1 flex items-center justify-center gap-1 line-clamp-1 truncate max-w-full">
            <Heart className="w-3 h-3 text-pink-200 fill-pink-200 shrink-0" />
            Add {filename} to public/images
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{ aspectRatio: ratioStyle }} 
      className={`relative overflow-hidden bg-slate-900 rounded-2xl w-full flex items-center justify-center border border-white/5 ${className}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/80 animate-pulse flex items-center justify-center">
          <Camera className="w-8 h-8 text-pink-400/40 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt || "Eva's photo"}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    </div>
  );
};
