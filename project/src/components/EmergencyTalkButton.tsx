import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';

const EmergencyTalkButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  
  const sendTalkRequest = () => {
    // In a real implementation, this would trigger a notification
    // or send a message to the partner's device
    console.log("Emergency talk request sent");
    setIsRequestSent(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsRequestSent(false);
      setIsOpen(false);
    }, 5000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 w-64"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Need to talk?</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            
            {!isRequestSent ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Send an emergency talk request when you need immediate attention.
                </p>
                <button
                  onClick={sendTalkRequest}
                  className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition flex items-center justify-center"
                >
                  <Phone size={16} className="mr-2" />
                  Call your Love
                </button>
              </>
            ) : (
              <div className="text-center py-2">
                <p className="text-success-600 font-medium">Request sent!</p>
                <p className="text-sm text-gray-500 mt-1">Getting back to you with an Ice-Cream</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-3 shadow-lg flex items-center justify-center ${
          isOpen ? 'bg-gray-600' : 'bg-primary-500 hover:bg-primary-600'
        } text-white transition-colors duration-200`}
      >
        <Phone size={24} />
      </motion.button>
    </div>
  );
};

export default EmergencyTalkButton;