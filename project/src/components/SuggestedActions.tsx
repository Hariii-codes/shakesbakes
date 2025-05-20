import React from 'react';
import { motion } from 'framer-motion';
import { useGrievanceStore } from '../store/useGrievanceStore';
import { getSuggestedActionsForMood } from '../data/suggestedActions';
import * as LucideIcons from 'lucide-react';

interface SuggestedActionsProps {
  moodLevel: number;
  grievanceId?: string;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ 
  moodLevel, 
  grievanceId 
}) => {
  const addActionTaken = useGrievanceStore(state => state.addActionTaken);
  
  const suggestedActions = getSuggestedActionsForMood(moodLevel);
  
  const handleActionClick = async (actionText: string) => {
    if (grievanceId) {
      await addActionTaken(grievanceId, actionText);
    }
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Dynamically get Lucide icon component
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon size={18} />;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Suggested Actions
      </h3>
      
      {suggestedActions.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No suggested actions for the current mood level.
        </p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {suggestedActions.map((action) => (
            <motion.div
              key={action.id}
              variants={item}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              onClick={() => handleActionClick(action.text)}
              className={`
                bg-white rounded-lg p-3 border border-gray-100 shadow-sm 
                cursor-pointer transition hover:border-primary-200
                ${grievanceId ? '' : 'pointer-events-none opacity-80'}
              `}
            >
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3">
                  {getIconComponent(action.icon)}
                </span>
                <span className="text-sm text-gray-700">{action.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {!grievanceId && (
        <p className="text-xs text-gray-500 mt-3">
          These are just suggestions. After submitting a grievance, you can click on actions to mark them as completed.
        </p>
      )}
    </div>
  );
};

export default SuggestedActions;