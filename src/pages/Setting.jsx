import React, { useState } from 'react';
import { FiUser, FiBell, FiSun, FiMoon, FiShield, FiLogOut, FiUpload, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../context/useTheme.js';

const Settings = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  const toggleTheme = themeContext?.toggleTheme || (() => {});
  const [profile, setProfile] = useState({
    name: 'Alok',
    email: 'alok@example.com',
    phone: '+91 9999999999',
    role: 'Administrator',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    newLead: true,
    taskDue: true,
    dealClosed: false,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
  };

  const renderToggle = (label, key, state, handler) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={state[key]} onChange={() => handler(key)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
      </label>
    </div>
  );

  return (
    <motion.main 
      className="flex-1 p-6 sm:p-8 bg-gray-100 min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <motion.div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" variants={cardVariants}>
              <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3"><FiUser className="text-orange-500"/> Profile</h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm" />
                  <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    <FiUpload className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{profile.name}</h3>
                  <p className="text-gray-500">{profile.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input type="text" name="role" value={profile.role} onChange={handleProfileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
              <div className="mt-6 text-right">
                <button className="px-6 py-2 bg-blue-500 text-white font-normal rounded-md shadow-sm hover:bg-orange-600 transition-colors">Save Changes</button>
              </div>
            </motion.div>

            
            <motion.div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" variants={cardVariants}>
              <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3"><FiShield className="text-orange-500"/> Security</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" placeholder="••••••••" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" placeholder="••••••••" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
              <div className="mt-6 text-right">
                <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md shadow-sm hover:bg-orange-700 transition-colors">Update Password</button>
              </div>
            </motion.div>
          </div>

          
          <div className="space-y-8">
            
            <motion.div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" variants={cardVariants}>
              <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-3">{theme === 'light' ? <FiSun className="text-orange-500"/> : <FiMoon className="text-orange-500"/>} Appearance</h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Theme</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => theme !== 'light' && toggleTheme()} className={`p-2 rounded-full ${theme === 'light' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    <FiSun />
                  </button>
                  <button onClick={() => theme !== 'dark' && toggleTheme()} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    <FiMoon />
                  </button>
                </div>
              </div>
            </motion.div>

            
            <motion.div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" variants={cardVariants}>
              <h2 className="text-xl font-medium text-gray-800 mb-2 flex items-center gap-3"><FiBell className="text-orange-500"/> Notifications</h2>
              <div className="divide-y divide-gray-200">
                {renderToggle('Email Notifications', 'email', notifications, handleNotificationToggle)}
                {renderToggle('Push Notifications', 'push', notifications, handleNotificationToggle)}
                {renderToggle('SMS Notifications', 'sms', notifications, handleNotificationToggle)}
              </div>
              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-2">Activity Alerts</h3>
              <div className="divide-y divide-gray-200">
                {renderToggle('New Lead Assigned', 'newLead', notifications, handleNotificationToggle)}
                {renderToggle('Task Due Soon', 'taskDue', notifications, handleNotificationToggle)}
                {renderToggle('Deal Closed', 'dealClosed', notifications, handleNotificationToggle)}
              </div>
            </motion.div>

            
            <motion.div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" variants={cardVariants}>
              <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-3"><FiLogOut className="text-red-500"/> Account Actions</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 text-left text-red-600 font-medium bg-red-50 rounded-md hover:bg-red-100 transition-colors flex items-center gap-3">
                  <FiTrash2 /> Deactivate Account
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Settings;
