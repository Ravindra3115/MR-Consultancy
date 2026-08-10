import React, { useState, useRef } from 'react';

const ContentWritingPage = () => {
  // --- Project Details State ---
  const [file, setFile] = useState(null);
  const [specifications, setSpecifications] = useState('');
  
  // --- Contact Form State ---
  const [isFirm, setIsFirm] = useState(false);
  const [isSameNumber, setIsSameNumber] = useState(false);
  const [contactName, setContactName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [clientOffer, setClientOffer] = useState(''); 
  const [address, setAddress] = useState('');

  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
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

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!specifications.trim()) {
        alert("Please provide some specifications or details about the content you need.");
        return;
    }
    if (phone.length !== 14) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    alert("Thank you! Your content request has been submitted. Our experts will contact you shortly.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. PAGE HEADER */}
      <section className="bg-[#FFDFD3] py-16 px-6 border-b-4 border-[#5A3244]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Professional Content Writing</h1>
          <p className="text-lg text-gray-800 font-medium">Engaging, SEO-optimized content that elevates your brand's voice.</p>
        </div>
      </section>

      {/* 2. UNIFIED REQUEST FORM SECTION */}
      <section className="py-20 px-6 bg-gray-50 relative">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          <div className="bg-[#5A3244] p-6 text-center">
            <h2 className="text-2xl font-bold text-[#FFDFD3]">Content Brief & Contact Details</h2>
            <p className="text-white opacity-80 text-sm mt-1">Tell us what you need, and we will craft the perfect message.</p>
          </div>

          <form onSubmit={handleFinalSubmit} className="p-8 md:p-12">
            
            {/* PART A: PROJECT DETAILS */}
            <div className="mb-12">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 border-[#5A3244] pb-2 inline-block">Project Details</h3>
              
              <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Content Specifications & Requirements *</label>
                <textarea 
                  required
                  rows="5" 
                  placeholder="Tell us about the topic, target audience, tone of voice, word count, and any specific requirements..."
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 resize-none bg-white" 
                  value={specifications} 
                  onChange={e => setSpecifications(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Upload Reference Material (Optional)</label>
                <div 
                  className="border-4 border-dashed border-[#FFDFD3] hover:border-[#5A3244] bg-gray-50 rounded-2xl p-8 text-center cursor-pointer transition duration-300"
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  {file ? (
                    <div>
                      <p className="text-xl font-bold text-[#5A3244]">File Attached!</p>
                      <p className="text-gray-800 mt-2 font-medium">{file.name}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl mb-2">📎</div>
                      <p className="text-md font-bold text-gray-900">Upload a brochure, outline, or reference document</p>
                      <p className="text-gray-500 text-sm mt-1">Click to browse or drag and drop</p>
                    </div>
                  )}
                </div>
                <p className="text-center text-xs text-gray-500 mt-3 font-medium">
                  🔒 All uploaded documents are strictly confidential with MR Association.
                </p>
              </div>
            </div>

            {/* PART B: CONTACT DETAILS */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 border-[#5A3244] pb-2 inline-block">Contact Details</h3>
              
              <div className="space-y-6">
                {/* Name & Firm Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Full Name *</label>
                    <input type="text" required className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900" value={contactName} onChange={e => setContactName(e.target.value)} />
                    <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-[#5A3244] cursor-pointer" checked={isFirm} onChange={e => setIsFirm(e.target.checked)} />
                      <span className="text-sm text-gray-800 font-medium">This is for a Firm / Company</span>
                    </label>
                  </div>
                  
                  {isFirm && (
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">Firm / Company Name *</label>
                      <input type="text" required className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900" value={firmName} onChange={e => setFirmName(e.target.value)} />
                    </div>
                  )}
                </div>

                {/* Phones Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">Phone Number *</label>
                      <input type="text" required className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 font-semibold tracking-wider" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">WhatsApp Number (Optional)</label>
                      <input type="text" disabled={isSameNumber} className={`w-full p-3 rounded-lg border-2 focus:outline-none text-gray-900 font-semibold tracking-wider ${isSameNumber ? 'bg-gray-100 border-gray-200 opacity-70' : 'border-gray-200 focus:border-[#5A3244] bg-white'}`} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
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
                    <input type="email" required className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  {isFirm && (
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">Company Email ID *</label>
                      <input type="email" required className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} />
                    </div>
                  )}
                </div>

                {/* Client's Offer / Budget Section */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">Your Proposed Budget / Offer (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Enter an amount"
                    className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900" 
                    value={clientOffer} 
                    onChange={e => setClientOffer(e.target.value)} 
                  />
                  <p className="text-xs text-gray-800 mt-1 font-medium opacity-80">If you have a specific budget in mind, let us know! We are open to negotiation.</p>
                </div>

                {/* Address Section */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">Full Address</label>
                  <textarea rows="3" className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#5A3244] focus:outline-none text-gray-900 resize-none" value={address} onChange={e => setAddress(e.target.value)}></textarea>
                </div>

              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-8 mt-10 border-t border-gray-200">
              <button type="submit" className="bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3] w-full py-4 rounded-xl font-bold text-xl shadow-xl transition duration-300 transform hover:-translate-y-1">
                Request Service
              </button>
              <p className="text-sm text-gray-800 mt-4 font-semibold opacity-90 text-center">
                Cost and estimated project delivery will be informed after our experts inspect your file and requirements.
              </p>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
};

export default ContentWritingPage;