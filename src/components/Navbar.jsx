import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import zestful from '../assets/clientnestlogo.jpeg';
import { FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-50/90 backdrop-blur-md shadow-xl rounded-3xl w-[90%] max-w-6xl font-['Inter',_sans-serif] transition-all duration-300">
      <div className="flex px-4 sm:px-6 lg:px-10 py-3 justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={zestful} alt="Zestful Logo" className="h-7 sm:h-8" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link to="about" className="text-gray-800 font-normal hover:text-orange-500 transition-colors">About Us</Link>
          <Link to="/features" className="text-gray-800 font-normal hover:text-orange-500 transition-colors">Features</Link>
          <Link to="/pricing" className="block text-gray-800 hover:text-orange-500">Pricing</Link>
          <Link to="/contact" className="block text-gray-800 hover:text-orange-500">Contact</Link>

{/*
          <div 
            className="relative"
            onMouseEnter={() => setPagesMenuOpen(true)}
            onMouseLeave={() => setPagesMenuOpen(false)}
          >
            <button className="flex items-center text-gray-800 font-normal hover:text-orange-500 transition-colors">
              <span>Pages</span>
              <FiChevronDown className="h-4 w-4 ml-1" />
            </button>
            <AnimatePresence>
              {isPagesMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl z-20"
                >
                  <div className="py-2">
                    <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-orange-50">About Us</Link>
                    <Link to="/pricing" className="block px-4 py-2 text-gray-800 hover:bg-orange-50">Pricing</Link>
                    <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-orange-50">Contact</Link>
                    <Link to="/blog" className="block px-4 py-2 text-gray-800 hover:bg-orange-50">Blog</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          */}
        </nav>

        <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
          <Link to="/signup">
            <button className="bg-orange-500 text-white font-normal py-2 px-4 lg:py-3 lg:px-6 rounded-lg hover:bg-gray-900 transition-all shadow text-sm lg:text-base">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-800 text-white font-normal py-2 px-4 lg:py-3 lg:px-6 rounded-lg hover:bg-gray-900 transition-all shadow text-sm lg:text-base">
              Login
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <button 
            className="text-gray-800 focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-b-3xl border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/about" 
                className="block text-gray-800 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/features" 
                className="block text-gray-800 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="block text-gray-800 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-800 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full bg-orange-500 text-white font-normal py-3 px-6 rounded-lg hover:bg-gray-900 transition-all shadow">
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full bg-gray-800 text-white font-normal py-3 px-6 rounded-lg hover:bg-gray-900 transition-all shadow">
                    Login
                  </button>
                </Link>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;