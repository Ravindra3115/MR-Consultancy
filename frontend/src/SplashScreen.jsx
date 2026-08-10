import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Step 1: Wait 2 seconds, then start fading out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Step 2: Wait 2.5 seconds total, then tell App.jsx to remove this screen
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    // Cleanup timers if the component unmounts early
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    // The background takes up the full screen. The ternary operator controls the fade opacity.
    <div 
      className={`fixed inset-0 bg-blue-900 flex flex-col items-center justify-center transition-opacity duration-500 z-50 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* The animate-pulse class gives it a breathing effect */}
        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-widest animate-pulse mb-4">
          MR ASSOCIATION
        </h1>
        <p className="text-teal-400 text-xl tracking-widest uppercase">
          Elevating Your Voice
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;