import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/Logo.png'; 

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !fullName)) {
      alert("Please fill in all required fields.");
      return;
    }

    if (email.toLowerCase() === 'admin@mrassociation.com') {
      localStorage.setItem('isLoggedIn', 'true'); 
      
      navigate('/admin-dashboard'); 
    } 
    else {
      localStorage.setItem('isLoggedIn', 'true'); 
      
      navigate('/client-portal'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 md:p-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-5/12 bg-[#5A3244] p-10 md:p-16 flex flex-col justify-between text-[#FFDFD3]">
          <div>
            <Link to="/">
              <img src={logoImg} alt="MR Association Logo" className="h-16 w-auto mb-10 cursor-pointer hover:opacity-80 transition" />
            </Link>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              {isLogin ? 'Welcome Back.' : 'Join Us.'}
            </h2>
            <p className="text-lg font-medium opacity-90">
              {isLogin 
                ? 'Access your secure client portal to track projects, manage quotes, and communicate with our experts.' 
                : 'Create an account to securely submit documents, receive quotes, and manage your translation and content projects.'}
            </p>
          </div>
          
          <div className="mt-12 text-sm font-semibold opacity-75">
            <p>&copy; {new Date().getFullYear()} MR Association.</p>
            <p>Secure & Confidential System.</p>
          </div>
        </div>

        <div className="md:w-7/12 p-10 md:p-16 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h3>
            <p className="text-gray-800 mt-2 font-medium">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-[#5A3244] font-bold hover:underline"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">Full Name *</label>
                  <input type="text" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 bg-gray-50" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">Firm / Company (Optional)</label>
                  <input type="text" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 bg-gray-50" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-900 font-bold mb-2">Email Address *</label>
              <input type="email" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 bg-gray-50" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">Password *</label>
              <input type="password" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 bg-gray-50" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm font-bold text-[#5A3244] hover:underline">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="w-full bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3] py-4 rounded-xl font-bold text-lg shadow-lg transition duration-300 transform hover:-translate-y-1 mt-4">
              {isLogin ? 'Secure Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;