import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/Logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 'U1', fullName: 'Mari', email: 'mari.cms@venusenterprises.com', phone: '+91 9876543210', firmName: 'Venus Enterprises', address: 'Bengaluru, Karnataka' },
    { id: 'U2', fullName: 'John Doe', email: 'john@example.com', phone: '+91 8888888888', firmName: 'Doe Corp', address: 'Mumbai, Maharashtra' }
  ]);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = () => {
      const stored = localStorage.getItem('mra_shared_projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        const seedData = [
          { id: 'P101', clientId: 'U1', clientName: 'Mari', service: 'Content Writing', status: 'requested', date: '2026-05-20', specs: 'Need a 1000-word SEO article for Venus Enterprises.', offer: '₹2000', file: 'brochure.pdf', adminCost: '', adminEta: '', adminMessage: '' },
          { id: 'P102', clientId: 'U2', clientName: 'John Doe', service: 'Translation', status: 'pending', date: '2026-05-18', specs: 'Translate legal document to Spanish.', offer: '₹5000', file: 'contract.docx', adminCost: '₹5500', adminEta: '3 Days', adminMessage: '' }
        ];
        setProjects(seedData);
        localStorage.setItem('mra_shared_projects', JSON.stringify(seedData));
      }
    };
    fetchProjects();
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('projects'); 
  const [projectSubTab, setProjectSubTab] = useState('requested'); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  
  const [quoteForm, setQuoteForm] = useState({ cost: '', eta: '', message: '' });
  
  // State specifically for finalizing a project
  const [completedFileName, setCompletedFileName] = useState('');

  useEffect(() => {
    if(selectedProject) {
      setQuoteForm({
        cost: selectedProject.adminCost || '',
        eta: selectedProject.adminEta || '',
        message: selectedProject.adminMessage || ''
      });
      setCompletedFileName(''); // Reset file name field
    }
  }, [selectedProject]);

  const handleUpdateProjectStatus = (newStatus, simulateEmailMsg = null, extraData = {}) => {
    const updatedProject = { 
      ...selectedProject, 
      status: newStatus,
      adminCost: quoteForm.cost,
      adminEta: quoteForm.eta,
      adminMessage: quoteForm.message,
      ...extraData // Allow passing additional fields like the completed file
    };

    const newProjectsList = projects.map(p => p.id === selectedProject.id ? updatedProject : p);
    setProjects(newProjectsList);
    localStorage.setItem('mra_shared_projects', JSON.stringify(newProjectsList));
    setSelectedProject(null);

    if (simulateEmailMsg) {
      alert(`EMAIL SENT TO CLIENT:\n\n${simulateEmailMsg}`);
    }
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if(!quoteForm.cost || !quoteForm.eta) {
      alert("Please provide an estimated cost and time before sending a quote.");
      return;
    }
    handleUpdateProjectStatus('quoted', `New Proposal: Cost ${quoteForm.cost}, Delivery: ${quoteForm.eta}. Message: ${quoteForm.message}`);
  };

  const handleAcceptProject = () => {
    handleUpdateProjectStatus('active', "Great news! We have formally accepted your project terms and work is now beginning.");
  };

  const handleRejectProject = () => {
    if(window.confirm("Are you sure you want to completely reject this project?")) {
      handleUpdateProjectStatus('rejected', "Unfortunately, we are unable to proceed with this project at this time.");
    }
  };

  // --- NEW: Handle Completing a Project ---
  const handleCompleteProject = (e) => {
    e.preventDefault();
    if(!completedFileName.trim()) {
      alert("Please provide the name of the final document you are delivering.");
      return;
    }
    handleUpdateProjectStatus('completed', "Excellent news! Your project is complete and the final documents are ready for download in your portal.", { completedFile: completedFileName });
  };

  // --- User Management Logic Restored ---
  const handleUserEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setIsEditingUser(false);
    alert("User profile updated successfully!");
  };

  const handleDeleteUser = (id) => {
    if(window.confirm("Are you sure you want to delete this user and all their projects?")) {
      setUsers(users.filter(u => u.id !== id));
      const filteredProjects = projects.filter(p => p.clientId !== id);
      setProjects(filteredProjects);
      localStorage.setItem('mra_shared_projects', JSON.stringify(filteredProjects));
      setSelectedUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert("Admin securely logged out.");
    navigate('/login');
  };

  const renderUserList = () => (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-[#5A3244] p-6">
        <h2 className="text-2xl font-bold text-[#FFDFD3]">Registered Clients</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {users.map(user => (
          <div key={user.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer" onClick={() => { setSelectedUser(user); setIsEditingUser(false); }}>
            <div>
              <p className="text-lg font-bold text-gray-900">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.firmName || 'Independent'} | {user.email}</p>
            </div>
            <button className="text-[#5A3244] font-bold">View Profile ➔</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectList = () => {
    const filteredProjects = projects.filter(p => {
      if (projectSubTab === 'requested') return p.status === 'requested';
      if (projectSubTab === 'pending') return ['quoted', 'client_accepted', 'client_rejected', 'active'].includes(p.status);
      if (projectSubTab === 'completed') return ['completed', 'rejected'].includes(p.status);
      return false;
    });

    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 p-4 flex gap-4 border-b border-gray-200">
          <button onClick={() => setProjectSubTab('requested')} className={`px-6 py-2 rounded-full font-bold transition ${projectSubTab === 'requested' ? 'bg-[#5A3244] text-[#FFDFD3]' : 'bg-white text-gray-600'}`}>New Requests</button>
          <button onClick={() => setProjectSubTab('pending')} className={`px-6 py-2 rounded-full font-bold transition ${projectSubTab === 'pending' ? 'bg-[#5A3244] text-[#FFDFD3]' : 'bg-white text-gray-600'}`}>Pending & Active</button>
          <button onClick={() => setProjectSubTab('completed')} className={`px-6 py-2 rounded-full font-bold transition ${projectSubTab === 'completed' ? 'bg-[#5A3244] text-[#FFDFD3]' : 'bg-white text-gray-600'}`}>Completed</button>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredProjects.length === 0 ? (
            <p className="p-10 text-center text-gray-500 font-medium">No projects in this category.</p>
          ) : (
            filteredProjects.map(proj => (
              <div key={proj.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer" onClick={() => setSelectedProject(proj)}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-lg font-bold text-gray-900">{proj.service}</p>
                    <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded uppercase">{proj.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-sm text-gray-500">Client: {proj.clientName} | Date: {proj.date}</p>
                </div>
                <button className="text-[#5A3244] font-bold">Review ➔</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-900 shadow-md p-4 sticky top-0 z-50 border-b-4 border-[#5A3244]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link to="/"><img src={logoImg} alt="Logo" className="h-10 w-auto filter brightness-0 invert" /></Link>
            <span className="text-[#FFDFD3] font-bold text-xl tracking-widest uppercase border-l-2 border-gray-700 pl-4">Admin Hub</span>
          </div>
          <Link to="/" className="text-gray-300 hover:text-white font-bold transition duration-300">Exit to Site</Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-28">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Management</h3>
            <nav className="space-y-2 flex flex-col h-full">
              <div>
                <button onClick={() => { setActiveTab('projects'); setSelectedProject(null); setSelectedUser(null); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 ${activeTab === 'projects' ? 'bg-[#5A3244] text-[#FFDFD3] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>📦 All Projects</button>
                <button onClick={() => { setActiveTab('users'); setSelectedProject(null); setSelectedUser(null); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 ${activeTab === 'users' ? 'bg-[#5A3244] text-[#FFDFD3] shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>👥 Client Base</button>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl font-bold transition duration-300 text-red-600 hover:bg-red-50">🚪 Secure Logout</button>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex-grow">
          {selectedProject ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <button onClick={() => setSelectedProject(null)} className="text-gray-500 font-bold mb-6 hover:text-gray-900">← Back to List</button>
              
              <div className="flex justify-between items-start mb-8 border-b-2 border-[#5A3244] pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">{selectedProject.service}</h2>
                  <p className="text-lg text-gray-600">Client: <span className="font-bold">{selectedProject.clientName}</span></p>
                </div>
                <div className="text-right">
                  <span className="bg-gray-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-lg uppercase block mb-2">State: {selectedProject.status.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Project Specifications:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedProject.specs}</p>
                <div className="mt-4 flex gap-8">
                  <p><span className="font-bold text-gray-900">Attached File:</span> {selectedProject.file || 'No file attached'}</p>
                  <p><span className="font-bold text-gray-900">Client's Initial Offer:</span> {selectedProject.offer || 'None'}</p>
                </div>
              </div>

              {/* ACTION PANEL: NEGOTIATION */}
              {['requested', 'quoted', 'client_accepted', 'client_rejected'].includes(selectedProject.status) && (
                <div className="bg-[#FFDFD3] p-8 rounded-2xl border border-[#5A3244]/20 mb-8">
                  <h3 className="text-xl font-extrabold text-[#5A3244] mb-4">Negotiation & Actions</h3>
                  
                  {selectedProject.status === 'client_accepted' && <div className="mb-4 bg-green-100 text-green-800 p-3 rounded font-bold">The Client ACCEPTED your last quote. Click Accept to begin work.</div>}
                  {selectedProject.status === 'client_rejected' && <div className="mb-4 bg-red-100 text-red-800 p-3 rounded font-bold">The Client REJECTED your last quote. Please send a new one.</div>}

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 font-bold mb-1">Price (₹) *</label>
                        <input type="text" className="w-full p-3 rounded-lg" value={quoteForm.cost} onChange={e => setQuoteForm({...quoteForm, cost: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold mb-1">Estimated Time *</label>
                        <input type="text" className="w-full p-3 rounded-lg" value={quoteForm.eta} onChange={e => setQuoteForm({...quoteForm, eta: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-900 font-bold mb-1">Message to Client</label>
                      <textarea className="w-full p-3 rounded-lg resize-none" rows="2" value={quoteForm.message} onChange={e => setQuoteForm({...quoteForm, message: e.target.value})}></textarea>
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t border-[#5A3244]/20 mt-6">
                      <button type="button" onClick={handleSendMail} className="bg-[#5A3244] hover:bg-[#4A2838] text-white px-6 py-3 rounded-lg font-bold flex-1 shadow-md">✉️ Send Quote</button>
                      <button type="button" onClick={handleAcceptProject} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-md">✅ Accept & Start</button>
                      <button type="button" onClick={handleRejectProject} className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-bold">❌ Reject</button>
                    </div>
                  </form>
                </div>
              )}

              {/* ACTION PANEL: PROJECT DELIVERY */}
              {selectedProject.status === 'active' && (
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-extrabold text-blue-900 mb-2">Deliver Completed Project</h3>
                  <p className="text-blue-800 mb-6">Upload the final document to mark this project as complete.</p>
                  
                  <form onSubmit={handleCompleteProject} className="space-y-4">
                    <div>
                      <label className="block text-blue-900 font-bold mb-2">Final Document File Name (Simulation) *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. final_translation.pdf"
                        className="w-full p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none" 
                        value={completedFileName} 
                        onChange={e => setCompletedFileName(e.target.value)} 
                      />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md w-full">
                      📤 Mark as Completed & Notify Client
                    </button>
                  </form>
                </div>
              )}

              {/* COMPLETED STATUS OVERVIEW */}
              {selectedProject.status === 'completed' && (
                <div className="bg-green-50 p-8 rounded-2xl border border-green-200 mt-6">
                  <h3 className="text-xl font-extrabold text-green-900 mb-4">Delivered Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Original Client File</p>
                      <p className="font-semibold text-gray-800 truncate">{selectedProject.file || 'No file provided'}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-400">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Final Admin Delivery</p>
                      <p className="font-bold text-green-700 truncate">{selectedProject.completedFile}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : 
          
          selectedUser ? (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                <button onClick={() => setSelectedUser(null)} className="text-gray-500 font-bold hover:text-gray-900">← Back to Directory</button>
                <button onClick={() => handleDeleteUser(selectedUser.id)} className="text-red-600 hover:text-red-800 font-bold px-4 py-2 bg-red-50 rounded-lg">Delete User Account</button>
              </div>

              <div className="p-8">
                {!isEditingUser ? (
                  <>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">{selectedUser.fullName}</h2>
                        <p className="text-lg text-gray-600 font-medium">{selectedUser.firmName || 'Independent'}</p>
                      </div>
                      <button onClick={() => setIsEditingUser(true)} className="bg-[#5A3244] hover:bg-[#4A2838] text-white px-6 py-2 rounded-lg font-bold shadow-md">Modify Data</button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl mb-8">
                      <div><p className="text-sm font-bold text-gray-400">EMAIL</p><p className="font-bold">{selectedUser.email}</p></div>
                      <div><p className="text-sm font-bold text-gray-400">PHONE</p><p className="font-bold">{selectedUser.phone}</p></div>
                      <div className="col-span-2"><p className="text-sm font-bold text-gray-400">ADDRESS</p><p className="font-bold">{selectedUser.address}</p></div>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveUser} className="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-4 border-b pb-2">Edit User Data</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block font-bold text-sm mb-1">Full Name</label><input type="text" name="fullName" value={selectedUser.fullName} onChange={handleUserEditChange} className="w-full p-2 border rounded" /></div>
                      <div><label className="block font-bold text-sm mb-1">Firm</label><input type="text" name="firmName" value={selectedUser.firmName} onChange={handleUserEditChange} className="w-full p-2 border rounded" /></div>
                      <div><label className="block font-bold text-sm mb-1">Email</label><input type="email" name="email" value={selectedUser.email} onChange={handleUserEditChange} className="w-full p-2 border rounded" /></div>
                      <div><label className="block font-bold text-sm mb-1">Phone</label><input type="text" name="phone" value={selectedUser.phone} onChange={handleUserEditChange} className="w-full p-2 border rounded" /></div>
                      <div className="col-span-2"><label className="block font-bold text-sm mb-1">Address</label><textarea name="address" value={selectedUser.address} onChange={handleUserEditChange} className="w-full p-2 border rounded" rows="2"></textarea></div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="bg-[#5A3244] text-white px-6 py-2 rounded font-bold">Save Changes</button>
                      <button type="button" onClick={() => setIsEditingUser(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold">Cancel</button>
                    </div>
                  </form>
                )}

                <h3 className="text-xl font-extrabold text-gray-900 mb-4 border-t-2 border-gray-100 pt-8">Projects by this Client</h3>
                <div className="space-y-3">
                  {projects.filter(p => p.clientId === selectedUser.id).map(proj => (
                    <div key={proj.id} className="bg-white border-2 border-gray-100 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-[#5A3244]" onClick={() => setSelectedProject(proj)}>
                      <div>
                        <p className="font-bold text-gray-900">{proj.service}</p>
                        <p className="text-sm text-gray-500">Date: {proj.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${proj.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            activeTab === 'projects' ? renderProjectList() : renderUserList()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;