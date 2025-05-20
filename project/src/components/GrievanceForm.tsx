import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import MoodSlider from './MoodSlider';
import SuggestedActions from './SuggestedActions';
import { useGrievanceStore } from '../store/useGrievanceStore';

const GrievanceForm: React.FC = () => {
  const navigate = useNavigate();
  const addGrievance = useGrievanceStore(state => state.addGrievance);
  
  const [formData, setFormData] = useState({
    reason: '',
    moodLevel: 3,
    whatShouldHaveDone: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMoodChange = (value: number) => {
    setFormData(prev => ({ ...prev, moodLevel: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addGrievance(formData);
      navigate('/history');
    } catch (error) {
      console.error('Failed to submit grievance:', error);
      // Could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Submit a Grievance</h2>
          <p className="text-gray-500 text-sm">
            Let me know what's bothering you so we can work through it together.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Where did i go wrong?
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              placeholder="Tell me what's on your mind..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            />
          </div>
          
          <MoodSlider 
            value={formData.moodLevel} 
            onChange={handleMoodChange} 
          />
          
          <div>
            <label htmlFor="whatShouldHaveDone" className="block text-sm font-medium text-gray-700 mb-1">
              What should I have done instead?
            </label>
            <textarea
              id="whatShouldHaveDone"
              name="whatShouldHaveDone"
              rows={3}
              value={formData.whatShouldHaveDone}
              onChange={handleChange}
              placeholder="You can ask me for an Ice-Cream..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            />
          </div>
          
          <SuggestedActions moodLevel={formData.moodLevel} />
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 flex items-center"
            >
              <X size={18} className="mr-1" />
              Cancel
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`
                px-4 py-2 rounded-md bg-primary-500 text-white flex items-center
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-600'}
              `}
            >
              <Send size={18} className="mr-1" />
              {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;