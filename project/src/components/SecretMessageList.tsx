import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Check } from 'lucide-react';
import { SecretMessage } from '../types';
import { useGrievanceStore } from '../store/useGrievanceStore';

interface SecretMessageListProps {
  messages: SecretMessage[];
}

const SecretMessageList: React.FC<SecretMessageListProps> = ({ messages }) => {
  const markMessageAsRead = useGrievanceStore(state => state.markMessageAsRead);
  
  if (messages.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        <MessageSquare className="mx-auto text-gray-400 mb-2" size={24} />
        <p>No secret messages yet.</p>
      </div>
    );
  }
  
  return (
    <AnimatePresence>
      <ul className="space-y-3">
        {messages.map((message) => (
          <motion.li
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              p-4 rounded-lg border ${
                message.isRead 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-secondary-50 border-secondary-200'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(message.dateCreated), { addSuffix: true })}
              </span>
              
              {message.isRead ? (
                <span className="inline-flex items-center text-xs text-gray-500">
                  <Check size={14} className="mr-1" />
                  Read
                </span>
              ) : (
                <button
                  onClick={() => markMessageAsRead(message.id)}
                  className="text-xs text-secondary-600 hover:text-secondary-700"
                >
                  Mark as read
                </button>
              )}
            </div>
            
            <p className={`mt-2 ${message.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
              {message.message}
            </p>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default SecretMessageList;