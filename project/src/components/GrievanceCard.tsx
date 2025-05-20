import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  Frown, MehIcon, SmileIcon, HeartIcon, CheckCircle, Clock
} from 'lucide-react';

import { Grievance } from '../types';

interface GrievanceCardProps {
  grievance: Grievance;
  isDetailed?: boolean;
}

const GrievanceCard: React.FC<GrievanceCardProps> = ({ 
  grievance, 
  isDetailed = false 
}) => {
  const getMoodIcon = (moodLevel: number) => {
    switch(moodLevel) {
      case 1: return <Frown className="text-error-500" />;
      case 2: return <Frown className="text-warning-500" />;
      case 3: return <MehIcon className="text-gray-500" />;
      case 4: return <SmileIcon className="text-success-500" />;
      case 5: return <HeartIcon className="text-primary-500" />;
      default: return <MehIcon className="text-gray-500" />;
    }
  };
  
  const timeAgo = formatDistanceToNow(new Date(grievance.dateCreated), { 
    addSuffix: true 
  });
  
  // Different styles based on forgiveness status
  const cardStyleClasses = grievance.isForgiven
    ? 'border-success-200 bg-success-50'
    : 'border-gray-200 bg-white';
    
  const statusBadge = grievance.isForgiven ? (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
      <CheckCircle size={12} className="mr-1" />
      Forgiven
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
      <Clock size={12} className="mr-1" />
      Pending
    </span>
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-lg shadow-sm border p-4 ${cardStyleClasses}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
            {getMoodIcon(grievance.moodLevel)}
          </div>
          <span className="ml-2 text-sm text-gray-500">{timeAgo}</span>
        </div>
        {statusBadge}
      </div>
      
      <div className="mb-3">
        <p className="text-gray-800 font-medium mb-1 line-clamp-2">
          {grievance.reason}
        </p>
        
        {isDetailed && grievance.whatShouldHaveDone && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 font-medium">What should have been done:</p>
            <p className="text-sm text-gray-700 mt-1">{grievance.whatShouldHaveDone}</p>
          </div>
        )}
      </div>
      
      {isDetailed && grievance.actionsTaken.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium mb-2">Actions taken:</p>
          <ul className="space-y-1">
            {grievance.actionsTaken.map((action, idx) => (
              <li key={idx} className="text-sm bg-gray-50 p-2 rounded flex items-start">
                <CheckCircle size={14} className="text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isDetailed && grievance.isForgiven && grievance.resolutionNotes && (
        <div className="mt-4 p-3 bg-success-50 rounded-md border border-success-100">
          <p className="text-sm text-gray-700">{grievance.resolutionNotes}</p>
        </div>
      )}
      
      {!isDetailed && (
        <div className="mt-2">
          <Link
            to={`/grievance/${grievance.id}`}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View details →
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default GrievanceCard;