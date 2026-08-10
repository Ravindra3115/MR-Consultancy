import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Pages & Components ---
import Home from './public/Home'; 
import TranslationPage from './public/TranslationPage';
import ContentWritingPage from './public/ContentWritingPage';
import ProofreadingPage from './public/ProofreadingPage';
import LoginPage from './public/LoginPage';
import ClientPortal from './public/ClientPortal';
import AdminDashboard from './public/AdminDashboard';
import AnimatedSplashScreen from './components/AnimatedSplashScreen';

// --- Assets ---
import logoImg from './assets/Logo.png'; 

// --- Utilities ---
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// --- Layout Components ---
const Navbar = () => {
  // Read the saved state directly from the browser's local storage!
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  return (
    <nav className="bg-[#5A3244] shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center transition duration-300 hover:opacity-80">
          <img 
            src={logoImg} 
            alt="MR Association Logo" 
            className="h-12 md:h-14 w-auto object-contain" 
          />
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-white hover:text-[#FFDFD3] font-semibold transition">Home</Link>
          <a href="/#services" className="text-white hover:text-[#FFDFD3] font-semibold transition">Services</a>
          
          {isLoggedIn ? (
            <Link to="/client-portal" className="bg-[#FFDFD3] text-gray-900 px-6 py-2 rounded-md hover:bg-white font-bold transition duration-300 shadow-sm flex items-center gap-2">
              <span>👤</span> My Profile
            </Link>
          ) : (
            <Link to="/login" className="bg-[#FFDFD3] text-gray-900 px-6 py-2 rounded-md hover:bg-white font-bold transition duration-300 shadow-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#5A3244] text-[#FFDFD3] py-8 text-center mt-auto">
    <div className="max-w-6xl mx-auto px-6">
      <p className="mb-2">&copy; {new Date().getFullYear()} MR Association. All rights reserved.</p>
      <p className="text-sm opacity-75">Translation | Content Writing | Proofreading</p>
    </div>
  </footer>
);

// --- Main Application ---
function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <ScrollToTop /> 
      
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Routes>
          {/* Routes WITH the standard Navbar and Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/translation" element={<TranslationPage />} />
                  <Route path="/services/writing" element={<ContentWritingPage />} />
                  <Route path="/services/proofreading" element={<ProofreadingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  
                  <Route path="/contact" element={<div className="p-20 text-center text-2xl font-bold text-gray-900">Contact Page Coming Soon!</div>} />
                  <Route path="/admin-dashboard" element={<div className="p-20 text-center text-2xl font-bold text-[#5A3244]">Admin Dashboard Coming Soon!</div>} />
                </Routes>
              </main>
              <Footer />
            </>
          } />

          {/* Routes WITHOUT the standard Navbar/Footer */}
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;