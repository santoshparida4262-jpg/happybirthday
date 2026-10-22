import React, { useState } from 'react';
import { BirthdayLock } from './components/BirthdayLock';
import { OpeningSurprise } from './components/OpeningSurprise';
import { FloatingBackground } from './components/FloatingBackground';
import { Navbar } from './components/Navbar';
import { BirthdayHero } from './components/BirthdayHero';
import { PhotoGallery } from './components/PhotoGallery';
import { BestFriendAwards } from './components/BestFriendAwards';
import { FriendshipLetter } from './components/FriendshipLetter';
import { SecretSurprise } from './components/SecretSurprise';
import { BirthdayEnding } from './components/BirthdayEnding';

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative font-sans selection:bg-pink-500 selection:text-white">
      {/* 🔐 SECTION 0 — BIRTHDAY DATE LOCK SCREEN */}
      {!isUnlocked && (
        <BirthdayLock onUnlock={() => setIsUnlocked(true)} />
      )}

      {/* 🎁 SECTION 1 — OPENING SURPRISE (Shown immediately after unlock) */}
      {isUnlocked && !hasOpenedSurprise && (
        <div className="relative z-20">
          <FloatingBackground />
          <OpeningSurprise onOpenComplete={() => setHasOpenedSurprise(true)} />
        </div>
      )}

      {/* 🎂 MAIN BIRTHDAY SURPRISE WEBSITE */}
      {isUnlocked && hasOpenedSurprise && (
        <div className="relative z-10 animate-fade-in">
          <FloatingBackground />
          <Navbar />

          <main className="space-y-16 sm:space-y-24">
            {/* SECTION 2 — HERO */}
            <BirthdayHero />

            {/* SECTION 3 — MEMORIES GALLERY */}
            <PhotoGallery />

            {/* SECTION 4 — SOULMATE AWARDS */}
            <BestFriendAwards />

            {/* SECTION 5 — HEARTFELT LETTER */}
            <FriendshipLetter />

            {/* SECTION 6 — SECRET SURPRISE */}
            <SecretSurprise />

            {/* SECTION 7 — CINEMATIC ENDING */}
            <BirthdayEnding />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
