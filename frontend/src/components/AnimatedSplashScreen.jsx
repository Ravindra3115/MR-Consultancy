import React, { useEffect, useState } from 'react';

// Import your custom sticker images
import motherImg from '../assets/mother.png';
import daughterImg from '../assets/daughter.png';
import logoImg from '../assets/logo.png';

const AnimatedSplashScreen = ({ onComplete }) => {
  const [startSplit, setStartSplit] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Start the split a little earlier (1 second in)
    const splitTimer = setTimeout(() => setStartSplit(true), 1000);
    
    // 2. Since the move is slower now, trigger the logo at 2.5 seconds
    const logoTimer = setTimeout(() => setShowLogo(true), 1200);
    
    // 3. Wait 5 seconds total, start fading the whole screen
    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);

    // 4. Wait 5.5 seconds total, then close the splash screen
    const completeTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    // Replaced bg-white with a custom peachish-pink hex code (#FFDFD3)
    <div 
      className={`fixed inset-0 bg-[#FFDFD3] flex flex-col items-center justify-center z-50 overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        
        {/* THE MOTHER STICKER */}
        {/* Added duration-[2000ms] for a slow 2-second slide */}
        {/* Start pos: -translate-x-12 (stands to the left). Target pos: -translate-x-56 or 24rem (moves way far left) */}
        {/* Added scale-[0.80] to shrink to 80% when splitting */}
        <img 
          src={motherImg} 
          alt="Mother"
          className={`absolute h-64 md:h-80 object-contain transition-all duration-[2000ms] ease-in-out z-20 ${
            startSplit 
              ? '-translate-x-56 md:-translate-x-[26rem] scale-[0.80]' 
              : '-translate-x-12 md:-translate-x-18 scale-100'
          }`}
        />

        {/* THE DAUGHTER STICKER */}
        {/* Start pos: translate-x-12 (stands to the right). Target pos: translate-x-56 or 24rem (moves way far right) */}
        <img 
          src={daughterImg} 
          alt="Daughter"
          className={`absolute h-64 md:h-80 object-contain transition-all duration-[2000ms] ease-in-out z-20 ${
            startSplit 
              ? 'translate-x-56 md:translate-x-[26rem] scale-[0.80]' 
              : 'translate-x-12 md:translate-x-18 scale-100'
          }`}
        />

        {/* THE SPLASHING LOGO */}
        {/* Made the logo slightly larger when fully visible to fill the newly created space */}
        <img 
          src={logoImg}
          alt="MR Association Logo"
          className={`absolute w-72 md:w-[28rem] object-contain transition-all duration-[1500ms] ease-out z-10 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>

    </div>
  );
};

export default AnimatedSplashScreen;