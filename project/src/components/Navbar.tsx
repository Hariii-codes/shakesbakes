import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, History, MessageCircleHeart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGrievanceStore } from '../store/useGrievanceStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const loveScore = useGrievanceStore(state => state.calculateLoveScore());
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Trigger heart animation on initial load
  useEffect(() => {
    setShowHeartAnimation(true);
    const timer = setTimeout(() => {
      setShowHeartAnimation(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/new', icon: <Heart size={20} />, label: 'New Grievance' },
    { to: '/history', icon: <History size={20} />, label: 'History' },
    { to: '/messages', icon: <MessageCircleHeart size={20} />, label: 'Secret Messages' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-600 font-bold text-xl"
          >
            <Heart className="text-primary-500" fill="currentColor" />
            <span className="hidden sm:block">Shakes Bakes</span>
          </Link>
          
          {/* Love Score */}
          <div className="hidden sm:flex items-center">
            <div className="relative flex items-center mr-4">
              <div className="text-sm text-gray-600 mr-2">Love Meter:</div>
              <div className="w-24 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    loveScore > 80 ? 'bg-primary-500' : 
                    loveScore > 60 ? 'bg-primary-400' : 
                    loveScore > 40 ? 'bg-warning-400' : 'bg-error-500'
                  }`} 
                  style={{ width: `${loveScore}%` }}
                ></div>
              </div>
              <AnimatePresence>
                {showHeartAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -top-4 -right-4"
                  >
                    <Heart className="text-primary-500" fill="currentColor" size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md transition hover:text-primary-600 ${
                      location.pathname === link.to ? 'text-primary-600 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="py-2">
              {/* Mobile Love Score */}
              <div className="flex items-center justify-center py-3 px-4 border-b">
                <div className="text-sm text-gray-600 mr-2">Love Meter:</div>
                <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      loveScore > 80 ? 'bg-primary-500' : 
                      loveScore > 60 ? 'bg-primary-400' : 
                      loveScore > 40 ? 'bg-warning-400' : 'bg-error-500'
                    }`} 
                    style={{ width: `${loveScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">{loveScore}%</span>
              </div>
              
              <ul className="space-y-1 px-2 py-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-md transition ${
                        location.pathname === link.to
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;