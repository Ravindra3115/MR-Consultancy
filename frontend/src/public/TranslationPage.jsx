import React, { useState, useRef } from 'react';

const TranslationPage = () => {
  // --- File & Estimate State ---
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimate, setEstimate] = useState(null);
  
  // --- Contact Form State ---
  const [isFirm, setIsFirm] = useState(false);
  const [isSameNumber, setIsSameNumber] = useState(false);
  const [contactName, setContactName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [clientOffer, setClientOffer] = useState(''); // New state for their proposed cost
  const [address, setAddress] = useState('');

  const fileInputRef = useRef(null);

  const pastWorks = [
    { id: 1, title: "Legal Contracts", client: "TechCorp Global", desc: "Translated 50+ pages of corporate merger documents from English to Mandarin with 100% legal compliance." },
    { id: 2, title: "Medical Journals", client: "Global Edu", desc: "Accurate translation of sensitive clinical trial results from German to English." },
    { id: 3, title: "E-Commerce Localization", client: "Venus Enterprises", desc: "Full website catalog translation (English to Spanish) resulting in a 40% increase in Latin American sales." }
  ];

  const languages = ["English", "Kannada", "Hindi", "Telugu", "German", "French"];

  // --- Handlers ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setEstimate(null); 
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setEstimate(null);
    }
  };

  // --- Phone Number Validation Logic ---
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+91 ')) {
      val = '+91 ';
    }
    const numbersOnly = val.substring(4).replace(/\D/g, '');
    const truncated = numbersOnly.substring(0, 10);
    const finalVal = '+91 ' + truncated;
    
    setPhone(finalVal);
    if (isSameNumber) {
      setWhatsapp(finalVal);
    }
  };

  const handleSameNumberToggle = (e) => {
    const checked = e.target.checked;
    setIsSameNumber(checked);
    if (checked) {
      setWhatsapp(phone);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!file || !sourceLang || !targetLang) {
      alert("Please upload a file and select both languages.");
      return;
    }

    setIsProcessing(true);
    setEstimate(null);

    setTimeout(() => {
      const simulatedWordCount = Math.floor(Math.random() * 2500) + 500;
      const costPerWord = 5; 
      
      setEstimate({
        words: simulatedWordCount,
        totalCost: simulatedWordCount * costPerWord,
      });
      setIsProcessing(false);
    }, 2000); 
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 14) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    alert("Thank you! Your request has been submitted. Our experts will contact you shortly.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. PAGE HEADER */}
      <section className="bg-[#FFDFD3] py-16 px-6 border-b-4 border-[#5A3244]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Professional Translation Services</h1>
          <p className="text-lg text-gray-800 font-medium">Bridging languages with native precision and industry-specific expertise.</p>
        </div>
      </section>

      {/* 2. PORTFOLIO SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-gray-800 max-w-2xl mx-auto opacity-80">Take a look at some of the complex translation projects we have successfully delivered.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastWorks.map((work) => (
              <div key={work.id} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#5A3244] transition duration-300">
                <div className="text-[#5A3244] text-sm font-bold tracking-widest uppercase mb-2">{work.client}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{work.title}</h3>
                <p className="text-gray-800 opacity-80">{work.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. UPLOAD & QUOTE SECTION */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          <div className="bg-[#5A3244] p-6 text-center">
            <h2 className="text-2xl font-bold text-[#FFDFD3]">Request a Translation</h2>
            <p className="text-white opacity-80 text-sm mt-1">Upload your document (PDF or Word) for a quick review.</p>
          </div>

          <div className="p-8 md:p-12 pb-6 border-b border-gray-200">
            <div 
              className="border-4 border-dashed border-[#FFDFD3] hover:border-[#5A3244] bg-gray-50 rounded-2xl p-10 text-center cursor-pointer transition duration-300 mb-4"
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
              {file ? (
                <div>
                  <p className="text-xl font-bold text-[#5A3244]">File Attached!</p>
                  <p className="text-gray-800 mt-2 font-medium">{file.name}</p>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-lg font-bold text-gray-900">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-2">Word (.doc, .docx) or PDF (.pdf)</p>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-gray-500 mb-8 font-medium">
              🔒 All uploaded documents are strictly confidential with MR Association.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-900 font-bold mb-2">Translate From:</label>
                <select className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-800 bg-white" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                  <option value="">Select Source Language...</option>
                  {languages.map(lang => <option key={`src-${lang}`} value={lang}>{lang}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-2">Translate To:</label>
                <select className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-800 bg-white" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                  <option value="">Select Target Language...</option>
                  {languages.map(lang => <option key={`tgt-${lang}`} value={lang}>{lang}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleCalculate} disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition duration-300 ${
                isProcessing ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3]'
              }`}
            >
              {isProcessing ? 'Analyzing Document...' : 'Calculate Cost'}
            </button>
          </div>

          {/* RESULTS & CONTACT DASHBOARD */}
          {estimate && (
            <div className="bg-[#FFDFD3] p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                
                {/* COLUMN 1: THE ESTIMATE */}
                <div className="lg:col-span-1 flex flex-col items-center justify-start space-y-10 bg-white/60 p-8 rounded-3xl border border-[#5A3244]/20 shadow-sm h-full">
                  <h3 className="text-2xl font-extrabold text-gray-900 border-b-2 border-[#5A3244] pb-2 w-full text-center">Initial Estimate</h3>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-800 font-bold uppercase tracking-wider mb-2">Estimated Words</p>
                    <p className="text-5xl font-extrabold text-[#5A3244]">{estimate.words.toLocaleString()}</p>
                  </div>
                  
                  <div className="w-16 h-1 bg-[#5A3244] opacity-20 rounded-full"></div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-800 font-bold uppercase tracking-wider mb-2">Base Cost</p>
                    <p className="text-5xl font-extrabold text-[#5A3244]">₹{estimate.totalCost.toLocaleString()}</p>
                  </div>
                </div>

                {/* COLUMN 2: CONTACT DETAILS FORM */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 border-[#5A3244] pb-2 inline-block">Contact Details</h3>
                  
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    {/* Name & Firm Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">Full Name *</label>
                        <input type="text" required className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900" value={contactName} onChange={e => setContactName(e.target.value)} />
                        <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#5A3244] cursor-pointer" checked={isFirm} onChange={e => setIsFirm(e.target.checked)} />
                          <span className="text-sm text-gray-800 font-medium">This is for a Firm / Company</span>
                        </label>
                      </div>
                      
                      {isFirm && (
                        <div>
                          <label className="block text-gray-900 font-bold mb-2">Firm / Company Name *</label>
                          <input type="text" required className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900" value={firmName} onChange={e => setFirmName(e.target.value)} />
                        </div>
                      )}
                    </div>

                    {/* Phones Section */}
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-900 font-bold mb-2">Phone Number *</label>
                          <input type="text" required className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900 font-semibold tracking-wider" value={phone} onChange={handlePhoneChange} />
                        </div>
                        <div>
                          <label className="block text-gray-900 font-bold mb-2">WhatsApp Number (Optional)</label>
                          <input type="text" disabled={isSameNumber} className={`w-full p-3 rounded-lg border-2 focus:outline-none text-gray-900 font-semibold tracking-wider ${isSameNumber ? 'bg-gray-200 border-gray-200 opacity-70' : 'border-white focus:border-[#5A3244] bg-white'}`} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                        </div>
                      </div>
                      <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-[#5A3244] cursor-pointer" checked={isSameNumber} onChange={handleSameNumberToggle} />
                        <span className="text-sm text-gray-800 font-medium">WhatsApp number is the same as Phone number</span>
                      </label>
                    </div>

                    {/* Email Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">Email ID *</label>
                        <input type="email" required className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      {isFirm && (
                        <div>
                          <label className="block text-gray-900 font-bold mb-2">Company Email ID *</label>
                          <input type="email" required className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} />
                        </div>
                      )}
                    </div>

                    {/* NEW: Client's Offer / Budget Section */}
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">Your Proposed Budget (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Enter an amount "
                        className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900" 
                        value={clientOffer} 
                        onChange={e => setClientOffer(e.target.value)} 
                      />
                      <p className="text-xs text-gray-800 mt-1 font-medium opacity-80">If you have a specific budget in mind, let us know! We are open to negotiation.</p>
                    </div>

                    {/* Address Section */}
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">Full Address</label>
                      <textarea rows="3" className="w-full p-3 rounded-lg border-2 border-white focus:border-[#5A3244] focus:outline-none text-gray-900 resize-none" value={address} onChange={e => setAddress(e.target.value)}></textarea>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4 mt-8 border-t border-[#5A3244]/20">
                      <button type="submit" className="bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3] w-full py-4 rounded-xl font-bold text-lg shadow-xl transition duration-300 transform hover:-translate-y-1">
                        Request Service
                      </button>
                      <p className="text-sm text-gray-800 mt-4 font-semibold opacity-90 text-center">
                        Actual cost and estimated project delivery will be informed after our experts inspect your file.
                      </p>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default TranslationPage;