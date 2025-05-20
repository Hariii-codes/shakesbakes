import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGrievanceStore } from '../store/useGrievanceStore';
import GrievanceCard from '../components/GrievanceCard';
import { History, Filter, Check, X } from 'lucide-react';

const GrievanceHistory: React.FC = () => {
  const grievances = useGrievanceStore(state => state.grievances);
  const [filter, setFilter] = useState<'all' | 'pending' | 'forgiven'>('all');
  
  const filteredGrievances = grievances.filter(grievance => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !grievance.isForgiven;
    if (filter === 'forgiven') return grievance.isForgiven;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <History className="text-gray-700 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">Grievance History</h1>
        </div>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-gray-100 text-gray-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center ${
              filter === 'pending' 
                ? 'bg-warning-100 text-warning-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <X size={16} className="mr-1" />
            Pending
          </button>
          <button
            onClick={() => setFilter('forgiven')}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center ${
              filter === 'forgiven' 
                ? 'bg-success-100 text-success-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Check size={16} className="mr-1" />
            Forgiven
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {filteredGrievances.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No grievances found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You haven't submitted any grievances yet." 
                : filter === 'pending' 
                ? "No pending grievances. That's great!" 
                : "No forgiven grievances yet."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGrievances.map((grievance) => (
              <motion.div
                key={grievance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GrievanceCard grievance={grievance} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrievanceHistory;