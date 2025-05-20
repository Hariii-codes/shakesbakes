import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm py-4 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm mb-2 sm:mb-0">
            <span>Made with</span>
            <Heart className="mx-1 text-primary-500" size={14} fill="currentColor" />
            <span>for a special someone</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Grievance Portal
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;