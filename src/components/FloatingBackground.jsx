import React, { useMemo } from 'react';

export const FloatingBackground = () => {
  // Generate static random positions once for background elements
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      size: `${Math.floor(Math.random() * 3) + 1}px`,
      duration: `${Math.floor(Math.random() * 4) + 2}s`,
      delay: `${Math.random() * 3}s`
    }));
  }, []);

  const floatingEmojis = useMemo(() => {
    const emojis = ['✨', '🎈', '🎉', '⭐', '💫', '💖'];
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 8.5) + 3}%`,
      duration: `${12 + (i % 5) * 3}s`,
      delay: `${(i % 4) * 2}s`,
      size: `${16 + (i % 3) * 6}px`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient gradient blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 -right-20 w-[30rem] h-[30rem] bg-pink-900/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-indigo-900/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }}></div>

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
            opacity: 0.7
          }}
        />
      ))}

      {/* Floating ambient emojis drift upward */}
      {floatingEmojis.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-0 animate-float-up opacity-30 hover:opacity-80 transition-opacity"
          style={{
            left: item.left,
            fontSize: item.size,
            animation: `floatUp ${item.duration} linear infinite`,
            animationDelay: item.delay
          }}
        >
          {item.emoji}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
