import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Send } from 'lucide-react';
import { useGrievanceStore } from '../store/useGrievanceStore';

const SecretMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const addSecretMessage = useGrievanceStore(state => state.addSecretMessage);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await addSecretMessage(message);
      setMessage('');
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to send secret message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-purple-100">
      <div className="flex items-center mb-4">
        <MessageSquareHeart className="text-secondary-500 mr-2" size={22} />
        <h2 className="text-lg font-semibold text-gray-800">Secret Message Vault</h2>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Leave a private message for your partner that they'll see later.
      </p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your secret message here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent transition"
          rows={4}
        />
        
        <div className="flex justify-end mt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className={`
              px-4 py-2 rounded-md text-white flex items-center
              ${isSubmitting || !message.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-secondary-500 hover:bg-secondary-600'}
            `}
          >
            <Send size={18} className="mr-1" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </div>
      </form>
      
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 p-3 bg-success-50 text-success-800 rounded-md text-sm flex items-center"
        >
          <MessageSquareHeart size={16} className="mr-2" />
          Message sent successfully!
        </motion.div>
      )}
    </div>
  );
};

export default SecretMessageForm;