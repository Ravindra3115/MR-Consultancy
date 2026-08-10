import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/Logo.png';

const ClientPortal = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); 
  const [isEditing, setIsEditing] = useState(false);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // --- Payment Simulation State ---
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [userData, setUserData] = useState({
    fullName: 'Mari',
    email: 'mari.cms@venusenterprises.com',
    phone: '+91 9876543210',
    firmName: 'Venus Enterprises',
    address: 'Bengaluru, Karnataka'
  });

  const [editFormData, setEditFormData] = useState({ ...userData });

  useEffect(() => {
    const fetchProjects = () => {
      const stored = localStorage.getItem('mra_shared_projects');
      if (stored) {
        setProjects(JSON.parse(stored).filter(p => p.clientId === 'U1'));
      }
    };
    fetchProjects();
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserData({ ...editFormData }); 
    setIsEditing(false); 
  };

  const handleClientDecision = (decision) => {
    const newStatus = decision === 'accept' ? 'client_accepted' : 'client_rejected';
    const updatedProject = { ...selectedProject, status: newStatus };
    setSelectedProject(updatedProject);
    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));

    const allProjects = JSON.parse(localStorage.getItem('mra_shared_projects'));
    const newAllProjects = allProjects.map(p => p.id === selectedProject.id ? updatedProject : p);
    localStorage.setItem('mra_shared_projects', JSON.stringify(newAllProjects));

    alert(`EMAIL SENT TO ADMIN:\n\nClient has ${decision === 'accept' ? 'ACCEPTED' : 'REJECTED'} the quote for ${selectedProject.service}.`);
  };

  // --- Simulated Payment Logic ---
  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    
    // Simulate a 2.5 second network request to Razorpay/Stripe
    setTimeout(() => {
      const updatedProject = { ...selectedProject, isPaid: true };
      
      // Update local state
      setSelectedProject(updatedProject);
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));

      // Update global database
      const allProjects = JSON.parse(localStorage.getItem('mra_shared_projects'));
      const newAllProjects = allProjects.map(p => p.id === selectedProject.id ? updatedProject : p);
      localStorage.setItem('mra_shared_projects', JSON.stringify(newAllProjects));
      
      setIsProcessingPayment(false);
      alert("Payment Successful! Your document is now unlocked and ready for download.");
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert("You have been securely logged out.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#5A3244] shadow-md p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
          <Link to="/" className="flex items-center transition duration-300 hover:opacity-80">
            <img src={logoImg} alt="MR Association Logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
          <Link to="/" className="bg-[#FFDFD3] text-gray-900 px-6 py-2 rounded-md hover:bg-white font-bold transition duration-300 shadow-sm">
            Home
          </Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 gap-8">
        
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-28">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Dashboard</h3>
            <nav className="space-y-2 flex flex-col h-full">
              <div>
                <button onClick={() => {setActiveTab('profile'); setSelectedProject(null);}} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 ${activeTab === 'profile' ? 'bg-[#5A3244] text-[#FFDFD3] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>👤 My Profile</button>
                <button onClick={() => {setActiveTab('projects'); setSelectedProject(null);}} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 ${activeTab === 'projects' ? 'bg-[#5A3244] text-[#FFDFD3] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>📦 My Projects</button>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 text-red-600 hover:bg-red-50 hover:text-red-700">🚪 Log Out</button>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex-grow">
          {activeTab === 'projects' && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              {selectedProject ? (
                <div className="p-8">
                  <button onClick={() => setSelectedProject(null)} className="text-gray-500 font-bold mb-6 hover:text-gray-900">← Back to Projects</button>
                  
                  <div className="flex justify-between items-start mb-6 border-b-2 border-[#5A3244] pb-4">
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900">{selectedProject.service}</h2>
                      <p className="text-gray-500 mt-1">Submitted: {selectedProject.date}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-2 rounded-lg uppercase border border-gray-200">
                      Status: {selectedProject.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Standard details hidden for brevity when completed to focus on delivery */}
                  {selectedProject.status !== 'completed' && (
                    <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
                      <p className="font-bold text-gray-900 mb-2">Your Request Details:</p>
                      <p className="text-gray-700">{selectedProject.specs}</p>
                      <p className="mt-2 text-sm text-gray-500">Your Proposed Budget: {selectedProject.offer || 'None'}</p>
                    </div>
                  )}

                  {selectedProject.status === 'quoted' && (
                    <div className="bg-[#FFDFD3] p-8 rounded-2xl border border-[#5A3244]/20">
                      <h3 className="text-xl font-extrabold text-[#5A3244] mb-4">Official Quote Received</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <p className="text-sm font-bold text-gray-400 uppercase">Estimated Cost</p>
                          <p className="text-2xl font-extrabold text-[#5A3244]">{selectedProject.adminCost}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <p className="text-sm font-bold text-gray-400 uppercase">Estimated Delivery</p>
                          <p className="text-2xl font-extrabold text-[#5A3244]">{selectedProject.adminEta}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => handleClientDecision('accept')} className="bg-[#5A3244] hover:bg-[#4A2838] text-white px-6 py-3 rounded-xl font-bold shadow-md flex-1 transition">Accept Offer</button>
                        <button onClick={() => handleClientDecision('reject')} className="bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900 px-6 py-3 rounded-xl font-bold flex-1 transition">Reject Offer</button>
                      </div>
                    </div>
                  )}

                  {/* SECURE DELIVERY & PAYMENT GATEWAY */}
                  {selectedProject.status === 'completed' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🎉</span>
                        <h3 className="text-2xl font-extrabold text-green-900">Project Completed!</h3>
                      </div>

                      {!selectedProject.isPaid ? (
                        /* UNPAID STATE: Locked View */
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl overflow-hidden relative">
                          
                          {/* Fake Document Preview */}
                          <div className="p-8 pb-32 bg-white/50 blur-[4px] select-none pointer-events-none">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
                            <div className="h-32 bg-gray-200 rounded w-full mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                          </div>

                          {/* Payment Overlay Overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent p-8 text-center">
                            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full">
                              <div className="text-4xl mb-4">🔒</div>
                              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Payment Required</h3>
                              <p className="text-gray-600 mb-6">Your final document is ready. Please complete the payment of <span className="font-bold text-gray-900">{selectedProject.adminCost}</span> to unlock your files.</p>
                              
                              <button 
                                onClick={handleSimulatePayment} 
                                disabled={isProcessingPayment}
                                className={`w-full py-4 rounded-xl font-bold shadow-lg transition duration-300 text-lg ${isProcessingPayment ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                              >
                                {isProcessingPayment ? 'Processing Securely...' : `Pay ${selectedProject.adminCost} & Unlock`}
                              </button>
                              <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <span>🛡️</span> Secure 256-bit SSL Encryption
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* PAID STATE: Unlocked View */
                        <div className="bg-green-50 p-8 rounded-2xl border border-green-200 animate-fade-in-up">
                           <div className="flex items-center gap-3 mb-6 bg-green-100 p-4 rounded-xl text-green-800 font-bold">
                            <span>✅</span> Payment of {selectedProject.adminCost} successful. Thank you!
                          </div>

                          <h3 className="text-xl font-extrabold text-green-900 mb-4">Your Files are Unlocked</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                              <p className="text-sm font-bold text-gray-400 uppercase mb-2">Original Submission</p>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800 truncate">{selectedProject.file || 'No file'}</span>
                                <button className="text-sm text-[#5A3244] font-bold underline">Download</button>
                              </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-400 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">FINAL</div>
                              <p className="text-sm font-bold text-gray-400 uppercase mb-2">Delivered Project</p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-green-700 truncate">{selectedProject.completedFile}</span>
                                <button className="text-sm text-green-700 font-bold underline bg-green-100 px-3 py-1 rounded">Download Final</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <div className="bg-[#5A3244] p-6 text-[#FFDFD3] font-bold text-xl">Project Pipeline</div>
                  {projects.length === 0 ? (
                    <p className="p-10 text-center text-gray-500 font-medium">You have no active projects.</p>
                  ) : (
                    projects.map(proj => (
                      <div key={proj.id} onClick={() => setSelectedProject(proj)} className="p-6 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{proj.service}</p>
                          <p className="text-sm text-gray-500 mt-1">Status: <span className="font-semibold uppercase">{proj.status.replace('_', ' ')}</span></p>
                        </div>
                        <button className="text-[#5A3244] font-bold bg-[#FFDFD3] px-4 py-2 rounded-lg">
                          {proj.status === 'completed' && !proj.isPaid ? 'Pay to Unlock' : 'View Details'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
             // Profile Code remains exactly the same
             <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
             <div className="h-32 bg-[#FFDFD3] w-full border-b-4 border-[#5A3244]"></div>
             <div className="p-8 md:p-12 relative">
               <div className="absolute -top-16 left-8 md:left-12">
                 <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden"><span className="text-5xl">🧑‍💻</span></div>
               </div>

               {!isEditing ? (
                 <div className="pt-16">
                   <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4">
                     <div>
                       <h2 className="text-3xl font-extrabold text-gray-900">{userData.fullName}</h2>
                       <p className="text-lg text-gray-600 font-medium">{userData.firmName || 'Independent Client'}</p>
                     </div>
                     <button onClick={() => setIsEditing(true)} className="bg-[#5A3244] hover:bg-[#4A2838] text-[#FFDFD3] px-8 py-3 rounded-lg font-bold transition shadow-md">Edit Profile</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                     <div><p className="text-sm font-bold text-gray-400 uppercase">Email Address</p><p className="text-lg font-semibold">{userData.email}</p></div>
                     <div><p className="text-sm font-bold text-gray-400 uppercase">Phone Number</p><p className="text-lg font-semibold">{userData.phone}</p></div>
                   </div>
                 </div>
               ) : (
                 <div className="pt-16">
                   <h2 className="text-2xl font-extrabold text-gray-900 mb-8 border-b-2 border-[#5A3244] pb-2 inline-block">Edit Profile Details</h2>
                   <form onSubmit={handleSaveProfile} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div><label className="block font-bold mb-2">Full Name</label><input type="text" name="fullName" required className="w-full p-4 rounded-xl border-2" value={editFormData.fullName} onChange={handleInputChange} /></div>
                       <div><label className="block font-bold mb-2">Firm / Company Name</label><input type="text" name="firmName" className="w-full p-4 rounded-xl border-2" value={editFormData.firmName} onChange={handleInputChange} /></div>
                     </div>
                     <div className="flex gap-4 pt-4 border-t border-gray-100">
                       <button type="submit" className="bg-[#5A3244] text-[#FFDFD3] px-8 py-4 rounded-xl font-bold">Save Changes</button>
                       <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold">Cancel</button>
                     </div>
                   </form>
                 </div>
               )}
             </div>
           </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;