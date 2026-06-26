import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiSearch, FiPlus, FiBriefcase, FiUser, FiInfo, FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from '../components/Modal';
import ContactForm from '../components/Contactform';

const initialContacts = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Marketing Head',
        company: 'Innovate LLC',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        email: 'priya.sharma@innovatellc.com',
        phone: '+91 98765 43210',
        category: 'Marketing',
        source: 'LinkedIn',
        lastActivity: 'Emailed about Q3 proposal',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        role: 'CTO',
        company: 'Tech Solutions',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        email: 'rajesh.kumar@techsolutions.com',
        phone: '+91 91234 56789',
        category: 'Tech',
        source: 'Referral',
        lastActivity: 'Project kickoff meeting last week',
    },
    {
        id: 3,
        name: 'Anjali Mehta',
        role: 'CEO',
        company: 'Global Inc',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        email: 'anjali.mehta@globalinc.com',
        phone: '+91 99887 76655',
        category: 'Executive',
        source: 'Conference',
        lastActivity: 'Follow-up call scheduled for Friday',
    },
    {
        id: 4,
        name: 'Vikram Singh',
        role: 'Sales Director',
        company: 'Acme Corp',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        email: 'vikram.singh@acmecorp.com',
        phone: '+91 98765 12345',
        category: 'Sales',
        source: 'Website Inquiry',
        lastActivity: 'Sent pricing details yesterday',
    },
    {
        id: 5,
        name: 'Sunita Patil',
        role: 'Product Manager',
        company: 'Future Systems',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
        email: 'sunita.patil@futuresystems.com',
        phone: '+91 91234 98765',
        category: 'Tech',
        source: 'LinkedIn',
        lastActivity: 'Demoed new feature, awaiting feedback',
    },
    {
        id: 6,
        name: 'Deepak Chopra',
        role: 'Lead Developer',
        company: 'Retail Giant',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
        email: 'deepak.chopra@retailgiant.com',
        phone: '+91 99988 87766',
        category: 'Tech',
        source: 'Referral',
        lastActivity: 'Code review session on Monday',
    },
];

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
                                <div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-theme-alt-background rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-transparent hover:border-orange-500/50"
        >
            <div className="absolute top-4 right-4 flex gap-2">
                <button 
                    onClick={() => onEdit(contact)} 
                    className="p-2 rounded-full text-theme-text-light hover:bg-theme-secondary hover:text-orange-500 transition-all duration-200"
                    aria-label="Edit Contact"
                >
                    <FiEdit size={18} />
                </button>
                <button 
                    onClick={() => onDelete(contact.id)} 
                    className="p-2 rounded-full text-theme-text-light hover:bg-theme-danger-light hover:text-theme-danger transition-all duration-200"
                    aria-label="Delete Contact"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-5">
                    <img src={contact.avatar} alt={contact.name} className="w-20 h-20 rounded-full border-4 border-theme-alt-background shadow-md" />
                    <div>
                        <h2 className="text-2xl font-medium text-theme-text-dark">{contact.name}</h2>
                        <p className="text-theme-text-light font-medium">{contact.role}</p>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4 space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-theme-text-dark">
                        <FiMail className="text-theme-text-light" size={16} />
                        <a href={`mailto:${contact.email}`} className="text-theme-text-dark hover:text-orange-500 transition-colors">{contact.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-theme-text-dark">
                        <FiPhone className="text-theme-text-light" size={16} />
                        <a href={`tel:${contact.phone}`} className="text-theme-text-dark hover:text-orange-500 transition-colors">{contact.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-theme-text-dark">
                        <FiUser className="text-orange-500" size={16} />
                        <span>Source: <span className="font-medium">{contact.source}</span></span>
                    </div>
                    <div className="flex items-start gap-3 text-theme-text-dark">
                        <FiInfo className="text-theme-text-light" size={16} />
                        <p className="text-sm text-theme-text-light mt-1">Last Activity: <span className="font-medium text-theme-text-dark">{contact.lastActivity}</span></p>
                    </div>
                </div>
            </div>
            <div className="bg-theme-secondary px-6 py-4 mt-auto">
                <div className="flex items-center gap-3 text-theme-text-light">
                    <FiBriefcase className="text-orange-500" size={16} />
                    <span className="font-medium">{contact.company}</span>
                </div>
            </div>
                </div>
    );
};

const Contacts = () => {
    const [contacts, setContacts] = useState(initialContacts);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const handleOpenModal = (contact = null) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingContact(null);
        setIsModalOpen(false);
    };

        const handleDeleteContact = (contactId) => {
        setContacts(contacts.filter(c => c.id !== contactId));
    };

    const handleFormSubmit = (formData) => {
        if (editingContact) {
            setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, ...formData } : c));
        } else {
            const newContact = { ...formData, id: Date.now() };
            setContacts([newContact, ...contacts]);
        }
        handleCloseModal();
    };

    const categories = useMemo(() => {
        const allCategories = contacts.map(c => c.category);
        return ['All', ...new Set(allCategories)];
    }, [contacts]);

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const matchesCategory = activeCategory === 'All' || contact.category === activeCategory;
            const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  contact.role.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [contacts, searchTerm, activeCategory]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-medium text-theme-text-dark">Contacts</h1>
                    <p className="mt-1 text-theme-text-light">Manage your professional network.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="relative">
                        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-theme-text-light" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-full sm:w-64 border border-theme-border rounded-lg bg-theme-alt-background focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                    </div>
                                        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 text-white font-medium shadow-md hover:shadow-lg hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all duration-300">
                        <FiPlus /> Add Contact
                    </button>
                </div>
            </div>


            <div className="flex items-center gap-2 mb-8 pb-2 overflow-x-auto">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeCategory === category ? 'bg-orange-500 text-white shadow-md' : 'bg-theme-alt-background text-theme-text-dark hover:bg-theme-secondary hover:text-black'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>


            <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredContacts.map(contact => (
                    <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        onEdit={handleOpenModal}
                        onDelete={handleDeleteContact}
                    />
                ))}
                </div>
            </AnimatePresence>

            {filteredContacts.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-xl font-medium text-theme-text-dark">No Contacts Found</h3>
                    <p className="text-theme-text-light mt-2">Try adjusting your search or filter.</p>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingContact ? 'Edit Contact' : 'Add New Contact'}>
                <ContactForm 
                    onSubmit={handleFormSubmit} 
                    contact={editingContact} 
                    onCancel={handleCloseModal} 
                />
            </Modal>
        </div>
    );
};

export default Contacts;
