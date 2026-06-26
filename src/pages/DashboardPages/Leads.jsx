import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiMoreVertical, FiEdit, FiTrash2, FiMail, FiUsers } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';

const initialLeads = [
  { id: 1, name: 'Amit Sharma', email: 'amit@example.com', phone: '919876543210', source: 'Website', status: 'New', created: '2025-07-01' },
  { id: 2, name: 'Reena Das', email: 'reena@example.com', phone: '919123456789', source: 'Referral', status: 'Contacted', created: '2025-07-02' },
  { id: 3, name: 'Mahesh Verma', email: 'mahesh@bizmail.com', phone: '919988776655', source: 'Email Campaign', status: 'Qualified', created: '2025-07-03' },
  { id: 4, name: 'Sunita Singh', email: 'sunita@example.com', phone: '919876543211', source: 'Cold Call', status: 'Failed', created: '2025-07-04' },
];

const statusColors = {
  New: 'bg-orange-100 text-orange-700 border-orange-200',
  Contacted: 'bg-blue-100 text-blue-700 border-blue-200',
  Qualified: 'bg-green-100 text-green-700 border-green-200',
  Failed: 'bg-red-100 text-red-700 border-red-200',
};

const ActionMenu = ({ lead, onEdit, onDelete, onClose, isOpen, onOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleShare = (platform) => {
    const text = `Check out this lead: ${lead.name} (${lead.email})`;
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/${lead.phone}?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${lead.email}?subject=Lead Details&body=${encodeURIComponent(text)}`;
        break;
      case 'teams':
        window.open(`https://teams.microsoft.com/l/chat/0/0?users=${lead.email}&message=${encodeURIComponent(text)}`, '_blank');
        break;
      default: break;
    }
    onClose();
  };

  return (
    <div className="relative inline-block text-left">
            <button onClick={onOpen} className="p-2 rounded-full hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                <FiMoreVertical className="h-5 w-5 text-gray-500" />
      </button>
      <AnimatePresence>
        {isOpen && (
                    <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
          >
            <div className="p-8 bg-gray-100">
                            <button onClick={() => { onEdit(); onClose(); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FiEdit className="text-gray-500" /> Edit Lead
              </button>
                            <button onClick={() => { onDelete(); onClose(); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <FiTrash2 /> Delete Lead
              </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={() => handleShare('whatsapp')} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaWhatsapp className="text-green-500" /> Share on WhatsApp
              </button>
                            <button onClick={() => handleShare('email')} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiMail className="text-orange-500" /> Share via Email
              </button>
                            <button onClick={() => handleShare('teams')} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiUsers className="text-red-500" /> Share on Teams
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Leads = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const handleOpenModal = (lead = null) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingLead) {
      // Update existing lead
      setLeads(leads.map(lead => lead.id === editingLead.id ? { ...lead, ...formData } : lead));
    } else {
      // Add new lead
      const newLead = { ...formData, id: Date.now(), created: new Date().toISOString().slice(0, 10) };
      setLeads([newLead, ...leads]);
    }
    handleCloseModal();
  };

  const handleDelete = (leadToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${leadToDelete.name}?`)) {
      setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
    }
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Leads</h1>
          <p className="mt-1 text-gray-500">Track and manage potential customers.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 mt-4 sm:mt-0 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          <FiPlus size={20} />
          <span>Add New Lead</span>
        </button>
      </div>

            <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-fixed">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left font-medium w-1/4">Lead</th>
                <th className="px-6 py-4 text-left font-medium w-1/4">Contact</th>
                <th className="px-6 py-4 text-left font-medium w-1/6">Source</th>
                <th className="px-6 py-4 text-left font-medium w-1/6">Status</th>
                <th className="px-6 py-4 text-left font-medium w-1/6">Created</th>
                <th className="px-6 py-4 text-left font-medium w-[5%]"></th>
              </tr>
            </thead>
                        <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {leads.map((lead) => (
                                    <motion.tr 
                    key={lead.id} 
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
                    className="hover:bg-indigo-50 transition-colors duration-200 group relative"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <div className="h-11 w-11 rounded-full bg-orange-100 flex items-center justify-center font-medium text-orange-600 border-2 border-white shadow-sm">
                            {lead.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                                                    <div className="font-normal text-gray-900 group-hover:text-orange-600 transition-colors">{lead.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-gray-800 font-medium">{lead.email}</div>
                                              <div className="text-gray-500">+{lead.phone}</div>
                    </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{lead.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium border ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{lead.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <ActionMenu 
                        lead={lead}
                        isOpen={activeActionMenu === lead.id}
                        onOpen={() => setActiveActionMenu(lead.id)}
                        onClose={() => setActiveActionMenu(null)}
                        onEdit={() => handleOpenModal(lead)}
                        onDelete={() => handleDelete(lead)}
                      />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <p className="p-4 text-center text-sm text-gray-400">Use the 3 dots to explore more options.</p>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingLead ? 'Edit Lead' : 'Add New Lead'}>
        <LeadForm 
          onSubmit={handleFormSubmit} 
          lead={editingLead} 
          onCancel={handleCloseModal} 
        />
      </Modal>
    </main>
  );
};

export default Leads;