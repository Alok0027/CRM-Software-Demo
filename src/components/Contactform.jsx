import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSubmit, contact, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        email: '',
        phone: '',
        category: 'Personal',
        source: 'Network',
        lastActivity: '',
        avatar: '',
    });

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        } else {
            setFormData({
                name: '',
                role: '',
                company: '',
                email: '',
                phone: '',
                category: 'Personal',
                source: 'Network',
                lastActivity: new Date().toISOString().split('T')[0], // Default to today
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}` // Random avatar
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const categories = ['Personal', 'Work', 'Tech', 'Finance', 'Marketing'];
    const sources = ['Network', 'Referral', 'Website', 'Event', 'Cold Call'];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select name="source" id="source" value={formData.source} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {sources.map(src => <option key={src} value={src}>{src}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="lastActivity" className="block text-sm font-medium text-gray-700 mb-1">Last Activity</label>
                    <input type="text" name="lastActivity" id="lastActivity" value={formData.lastActivity} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 mt-6 border-t border-gray-200">
                <button type="button" onClick={onCancel} className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-200 text-gray-800 font-normal hover:bg-gray-300 transition">
                    Cancel
                </button>
                <button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                    {contact ? 'Update Contact' : 'Add Contact'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
