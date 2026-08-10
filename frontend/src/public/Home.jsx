import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  const services = [
    {
      id: 1,
      title: 'Expert Translation',
      description: 'Bridging language gaps with accurate, culturally relevant translations for legal, technical, and general documents.',
      icon: '🌐',
      link: '/services/translation'
    },
    {
      id: 2,
      title: 'Content Writing',
      description: 'Engaging, SEO-optimized content that elevates your brand\'s voice across blogs, websites, and technical manuals.',
      icon: '✍️',
      link: '/services/writing'
    },
    {
      id: 3,
      title: 'Precision Proofreading',
      description: 'Meticulous copyediting and deep developmental edits to ensure your final drafts are flawless and professional.',
      icon: '🔍',
      link: '/services/proofreading'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FFDFD3] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0">
            {/* Charcoal Grey Text */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Elevate Your Brand's Voice Globally.
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-8 font-medium">
              Expert translation, precision proofreading, and engaging content writing tailored for modern businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Transparent Button with Plum Border */}
              <a href="#services" className="bg-transparent border-2 border-[#5A3244] hover:bg-[#5A3244] hover:text-[#FFDFD3] text-gray-900 font-bold py-3 px-8 rounded-md transition duration-300 text-center">
                Explore Services
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Clean White Placeholder for your team graphic */}
            <div className="w-full h-80 bg-white rounded-3xl flex items-center justify-center shadow-xl border-4 border-white">
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BANNER */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-800 uppercase tracking-wider mb-4 font-bold opacity-70">Trusted by Innovative Companies</p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-60 flex-wrap text-gray-900">
            <span className="text-xl font-bold">TechCorp</span>
            <span className="text-xl font-bold">Global Edu</span>
            <span className="text-xl font-bold">Venus Enterprises</span>
            <span className="text-xl font-bold">InnovateX</span>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Core Competencies</h2>
            <p className="text-gray-800 max-w-2xl mx-auto opacity-80 font-medium">We provide comprehensive linguistic and content solutions to help you communicate effectively with your target audience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 border-[#FFDFD3] hover:border-[#5A3244] flex flex-col h-full group">
                {/* Peach Icon Background */}
                <div className="w-16 h-16 bg-[#FFDFD3] rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                {/* Charcoal Grey Headings & Text */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-800 opacity-80 mb-6 flex-grow">{service.description}</p>
                <Link to={service.link} className="text-[#5A3244] font-bold flex items-center mt-auto">
                  Learn More <span className="ml-2 bg-[#FFDFD3] text-gray-900 px-2 py-1 rounded-full group-hover:ml-3 transition-all duration-300">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER SECTION */}
      <section className="bg-[#5A3244] py-20 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center bg-[#FFDFD3] p-10 md:p-14 rounded-3xl shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">Stay Updated with Industry Insights</h2>
          <p className="text-gray-800 opacity-80 mb-8 font-medium">Subscribe to our newsletter for tips on global communication and content strategy.</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-5 py-4 rounded-lg border-2 border-white focus:outline-none focus:border-[#5A3244] shadow-sm text-gray-900 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Plum Button */}
            <button 
              type="submit" 
              className="bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3] font-bold py-4 px-8 rounded-lg transition duration-300 shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;