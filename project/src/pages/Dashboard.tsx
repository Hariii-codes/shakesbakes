import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, History, PlusCircle, MessageSquareHeart } from 'lucide-react';
import { useGrievanceStore } from '../store/useGrievanceStore';
import SecretMessageForm from '../components/SecretMessageForm';

const Dashboard: React.FC = () => {
  const grievances = useGrievanceStore(state => state.grievances);
  const loveScore = useGrievanceStore(state => state.calculateLoveScore());
  
  const unforgivenCount = grievances.filter(g => !g.isForgiven).length;
  const totalCount = grievances.length;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10 pt-8 pb-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center shadow-lg">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <Heart className="text-primary-500" size={48} fill="currentColor" />
              </motion.div>
            </div>
          </div>
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg font-bold">
            {loveScore}%
          </div>
        </motion.div>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          Shakes Bakes
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          A safe space to express your feelings and work through issues together.
        </p>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <motion.div variants={item}>
          <Link 
            to="/new"
            className="block bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg p-6 transition transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Express Yourself</h2>
              <PlusCircle size={24} />
            </div>
            <p className="text-primary-100 mb-4">
              Share what's bothering you so we can address it together.
            </p>
            <span className="inline-flex items-center text-sm font-medium">
              Submit a new grievance
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>
        
        <motion.div variants={item}>
          <Link 
            to="/history"
            className="block bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg p-6 transition transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">History</h2>
              <History size={24} />
            </div>
            <p className="text-secondary-100 mb-4">
              {totalCount === 0 
                ? "Your relationship journal is empty. That's a good thing!" 
                : `${unforgivenCount} unresolved issues out of ${totalCount} total.`}
            </p>
            <span className="inline-flex items-center text-sm font-medium">
              View past grievances
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>
        
        <motion.div variants={item} className="md:col-span-2">
          <SecretMessageForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;