import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ForgiveButtonProps {
  grievanceId: string;
  isAlreadyForgiven: boolean;
  onForgive: (id: string, notes?: string) => Promise<void>;
}

const ForgiveButton: React.FC<ForgiveButtonProps> = ({ 
  grievanceId, 
  isAlreadyForgiven,
  onForgive 
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  const handleForgive = async () => {
    setIsSubmitting(true);
    
    try {
      await onForgive(grievanceId, notes);
      setShowDialog(false);
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to forgive:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isAlreadyForgiven) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-success-50 rounded-lg border border-success-100">
        <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mb-2">
          <Heart className="text-success-600" fill="currentColor" />
        </div>
        <h3 className="text-success-700 font-medium text-center">This has been forgiven</h3>
        <p className="text-success-600 text-sm text-center mt-1">
          Thank you for your understanding and love.
        </p>
      </div>
    );
  }
  
  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          colors={['#ec4899', '#8b5cf6', '#3b82f6', '#f472b6']}
        />
      )}
      
      <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 relative">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
          <Heart className="text-primary-600" />
        </div>
        <h3 className="text-gray-800 font-medium text-center mb-1">Ready to forgive?</h3>
        <p className="text-gray-600 text-sm text-center mb-4">
          If you're feeling better now, you can mark this as forgiven.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDialog(true)}
          className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-sm transition flex items-center"
        >
          <Heart className="mr-1" size={18} fill="currentColor" />
          Forgive
        </motion.button>
        
        <AnimatePresence>
          {showDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Forgiveness Note</h3>
                  <button 
                    onClick={() => setShowDialog(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Would you like to leave a note about how this was resolved?
                </p>
                
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Example: We talked it through and I understand how he feels now."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition mb-4"
                  rows={3}
                />
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md flex items-center"
                  >
                    <X size={18} className="mr-1" />
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleForgive}
                    disabled={isSubmitting}
                    className={`
                      px-4 py-2 bg-primary-500 text-white rounded-md flex items-center
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-600'}
                    `}
                  >
                    <Check size={18} className="mr-1" />
                    {isSubmitting ? 'Forgiving...' : 'Yes, Forgive'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ForgiveButton;