import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGrievanceStore } from '../store/useGrievanceStore';
import GrievanceCard from '../components/GrievanceCard';
import ForgiveButton from '../components/ForgiveButton';
import SuggestedActions from '../components/SuggestedActions';

const GrievanceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const grievances = useGrievanceStore(state => state.grievances);
  const forgiveGrievance = useGrievanceStore(state => state.forgiveGrievance);
  
  const grievance = grievances.find(g => g.id === id);
  
  if (!grievance) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-gray-800 mb-4">Grievance not found</h2>
        <button 
          onClick={() => navigate('/history')}
          className="text-primary-600 hover:text-primary-700 flex items-center justify-center mx-auto"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to History
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => navigate('/history')}
        className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to History
      </button>
      
      <div className="mb-6">
        <GrievanceCard grievance={grievance} isDetailed />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SuggestedActions 
            moodLevel={grievance.moodLevel} 
            grievanceId={grievance.id}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ForgiveButton 
            grievanceId={grievance.id} 
            isAlreadyForgiven={grievance.isForgiven}
            onForgive={forgiveGrievance}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GrievanceDetail;